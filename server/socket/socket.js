import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000", "https://molla-shop-beige.vercel.app/"],
    methods: ["GET", "POST", "PUT"],
  },
});

let onlineUsers = [];

io.on("connection", (socket) => {
  console.log("A user connected - socketId: ", socket);

  socket.on("addUserIsOnline", (userId) => {
    if (!userId) return;

    const isExisted = onlineUsers.some((item) => item.userId === userId);

    if (!isExisted) {
      onlineUsers.push({ userId, socketId: socket.id });
    }

    io.emit("getOnlineUsers", onlineUsers);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected - socketId: ", socket.id);
    onlineUsers = onlineUsers.filter((user) => user.socketId !== socket.id);
    io.emit("getOnlineUsers", onlineUsers);
  });
});

export const getUserSocketId = (userId) => {
  const user = onlineUsers.find((user) => user.userId === userId);
  return user ? user.socketId : null;
};

export { app, io, server };
