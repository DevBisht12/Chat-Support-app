import express from "express";
import cors from "cors";
import connectDB from "./database/dbConnect/connectDB.js";
import userRoutes from "./routes/userRoutes.js";
import { Server } from "socket.io";
import dotenv from 'dotenv';
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";

// const db_URL = "mongodb+srv://rahulsinghbisht125:0tmagssqTgajvwIY@chatapp.8twhmdf.mongodb.net/?retryWrites=true&w=majority&tls=true&tlsAllowInvalidCertificates=true";

const app = express();


dotenv.config();
const PORT = process.env.PORT||8000;

app.use(cors());
app.use(express.json());

const server = createServer(app);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

connectDB(process.env.DB_URL);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.use(express.static(path.join(__dirname, '/client/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/dist/index.html'));
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
    socket.join(userId);
    console.log(userId, 'userid from or roomid form message to support');
    if (!userAndSupportChat[userId]) {
      userAndSupportChat[userId] = null;
      io.to("supportRoom").emit("requestFromUser", userId);
    }
    io.to(userId).emit("receiveMessage", message, sender, userId);
  });

  socket.on("acceptUserJoinRequest", ({ supportId, name, roomId }) => {
    socket.join(roomId);
    console.log(roomId, 'acceptUser join request');
    userAndSupportChat[roomId] = supportId;
    io.to(roomId).emit("chatStarted", { userId: roomId });
    socket.emit("sendSupportId", supportId);
    socket.leave("supportRoom");
  });

  socket.on("sendMessage", ({ roomId, message, sender }) => {
    console.log(roomId);
    console.log(roomId, 'send Message');
    console.log('from line no 76', userAndSupportChat);
    if (userAndSupportChat[roomId]) {
      io.to(roomId).emit("receiveMessage", message, sender, roomId);
    } else {
      io.to("supportRoom").emit("requestFromUser", roomId);
    }
  });

  socket.on("leaveRoom", ({ roomId, supportId }) => {
    const RoomId = roomId;
    socket.leave(RoomId);
    console.log('from leave room id ', roomId);
    console.log('from line no 87', io.sockets.adapter.rooms.get(roomId).size);
  });
});

server.listen(PORT, () => {
  console.log(`Server started at PORT ${PORT}`);
});
