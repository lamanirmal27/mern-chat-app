import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const FRONTEND_URL =
  process.env.DEV_ENV === "development"
    ? "http://localhost:5173"
    : process.env.DEV_ENV;
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: FRONTEND_URL,
    methods: ["GET", "POST"],
    credentials: true,
  },
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
    // socket.broadcast.emit("typingResponse", data);
  });

  socket.on("stopTyping", () => {
    socket.broadcast.emit("stopTypingResponse");
  });

  socket.on("disconnect", () => {
    console.log("a client disconnected", socket.id);
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { app, io, server };
