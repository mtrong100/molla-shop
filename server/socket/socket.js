import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT"],
  },
});

let onlineUsers = [];

io.on("connection", (socket) => {
  console.log("A user connected - socketId: ", socket.id);

  onlineUsers.push({ id: socket.id });

  io.emit("getOnlineUsers", onlineUsers);

  socket.on("disconnect", () => {
    console.log("User disconnected - socketId: ", socket.id);
    onlineUsers = onlineUsers.filter((user) => user.id !== socket.id);
    io.emit("getOnlineUsers", onlineUsers);
  });
});

export { app, io, server };
