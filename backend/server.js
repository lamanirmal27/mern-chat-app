import express from "express";
import path from "path";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";
import connectToMongoDB from "./db/connectToMongoDB.js";
import { corsOptions } from "./config/corsOptions.js";

import passport from "passport";
import googleOAuthStrategy from "./config/passport.js";
import sessionConfig from "./middleware/sessionConfig.js"; // Import session configuration and initializeSession

import { app, server } from "./socket/socket.js";

dotenv.config();

const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "/frontend/dist")));

const PORT = process.env.PORT || 4005;

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));

// Connect to database
connectToMongoDB();

// Session middleware
app.use(sessionConfig);

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Use initializeSession middleware
// app.use(initializeSession);

// Setup Google OAuth Strategy
googleOAuthStrategy(
  passport,
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_CALLBACK_URL
);

// Routes
app.use("/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
// });

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});