import express from "express";
import cors from "cors";
import connectDB from "./database/dbConnect/connectDB.js";
import userRoutes from "./routes/userRoutes.js";
import { Server } from "socket.io";
import { createServer } from "http";

const db_URL = "mongodb://127.0.0.1:27017";
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const server = createServer(app);

connectDB(db_URL);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

app.get("/", (req, res) => {
  res.send("Server is running..");
});

app.use("/api/user", userRoutes);

const supportRoom = [];
const userRoom = [];
const userAndSupportChat = {};

io.on("connection", (socket) => {
  socket.on("joinRoom", (userData) => {
    if (userData.role === "support") {
      if (!supportRoom.includes(userData.name)) {
        socket.join("supportRoom");
        supportRoom.push(userData.name);
        console.log(`Support ${userData.name} joined support room`);
      }
    } else if (userData.role === "user") {
      if (!userRoom.includes(userData.name)) {
        socket.join("userRoom");
        userRoom.push(userData.name);
        console.log(`User ${userData.name} joined user room`);
      }
    }
  });

  socket.on("messageToSupport", ({ userId, message, sender }) => {
    console.log('First message:', message);
    socket.join(userId);
    if (!userAndSupportChat[userId]) {
      userAndSupportChat[userId] = null; 
      io.to("supportRoom").emit("requestFromUser", userId);
    }
    io.to(userId).emit("receiveMessage", message, sender, userId);
  });

  socket.on("acceptUserJoinRequest", ({ supportId, name, roomId }) => {
    console.log("Support accepted request:", supportId, name, roomId);
    socket.join(roomId);
    userAndSupportChat[roomId] = supportId; 
    console.log(userAndSupportChat);
    io.to(roomId).emit("chatStarted", { userId: roomId });
    socket.emit("sendSupportId", supportId);
    socket.leave("supportRoom");
    console.log('Number of people joined the room:', io.sockets.adapter.rooms.get(roomId).size);
  });

  socket.on("leaveRoom", ({ roomId, supportId }) => {
    console.log(roomId,supportId)
    socket.leave(roomId);
    console.log(`${supportId} left the user room ${roomId}`);
    delete userAndSupportChat[roomId];  // Clean up the chat mapping
    console.log('Number of people joined the room:', io.sockets.adapter.rooms.get(roomId).size||0);
    socket.join("supportRoom");
   
  });

  socket.on("sendMessage", ({ roomId, message, sender }) => {
    console.log('Sending message to room:', roomId, 'Message:', message, 'Sender:', sender);
    if (userAndSupportChat[roomId]) {
      io.to(roomId).emit("receiveMessage", message, sender, roomId);
    } else {
      io.to("supportRoom").emit("requestFromUser", roomId);
      io.to(roomId).emit("receiveMessage", message, sender, roomId);
    }
  });
});

server.listen(PORT, () => {
  console.log(`Server started at PORT ${PORT}`);
});
