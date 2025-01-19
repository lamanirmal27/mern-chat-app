import { Server } from "socket.io";
import http from "http";
import express from "express";
import { corsOptions } from "../config/corsOptions.js";

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
  cors: corsOptions,
});

const userSocketMap = {};

export const getReceiverSocketId = (receiverId) => {
  return userSocketMap[receiverId];
};

io.on("connection", (socket) => {
  console.log("a new client connected", socket.id);
  const userId = socket.handshake.query.userId;

  if (userId !== "undefined") {
    userSocketMap[userId] = socket.id;
  }

  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("typing", (data) => {
    const receiverSocketId = getReceiverSocketId(data?.receiver);
    socket.to(receiverSocketId).emit("typingResponse", data);
  });

  socket.on("stopTyping", () => {
    socket.broadcast.emit("stopTypingResponse");
  });

  socket.on("disconnect", () => {
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { app, io, server };
