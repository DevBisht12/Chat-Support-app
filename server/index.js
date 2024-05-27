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
const server = createServer(app);

connectDB(db_URL);

app.use(express.json());
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

const Supportroom = [];
const UserRoom = [];
const UserAndSupportChat = {};

io.on("connection", (socket) => {
  socket.on("joinRoom", (userData) => {
    if (userData.role === "support") {
      if (!Supportroom.includes(userData.name)) {
        socket.join("supportRoom");
        Supportroom.push(userData.name);
        console.log(`Support ${userData.name} joined support room`);
      }
    } else if (userData.role === "user") {
      if (!UserRoom.includes(userData.name)) {
        socket.join("userRoom");
        UserRoom.push(userData.name);
        console.log(`User ${userData.name} joined user room`);
      }
    }
  });

  socket.on("messageToSupport", ({ userId, message }) => {
    socket.join(userId);
    if (!UserAndSupportChat[userId]) {
      UserAndSupportChat[userId] = null; 
      io.to("supportRoom").emit("requestFromUser", userId);
    }
  });

  socket.on("acceptUserJoinRequest", ({ supportId, name, roomId }) => {
    console.log("Support accepted request:", supportId, name, roomId);
    socket.join(roomId);
    UserAndSupportChat[roomId] = supportId; 
    console.log(UserAndSupportChat);
    io.to(roomId).emit("chatStarted", { userId: roomId });
    socket.emit("sendSupportId", supportId);
    console.log('Number of People joined the room :',io.sockets.adapter.rooms.get(roomId).size)
  });

  socket.on("sendMessage", ({ roomId, message, sender }) => {
    console.log('Sending message to room:', roomId, 'Message:', message, 'Sender:', sender);
    io.to(roomId).emit("receiveMessage", message, sender, roomId );
  });
});


server.listen(PORT, () => {
  console.log(`Server started at PORT ${PORT}`);
});
