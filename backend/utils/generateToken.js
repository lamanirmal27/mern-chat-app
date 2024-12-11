import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const generateTokenAndSetCookie = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "15d",
  });

  const isProduction = process.env.NODE_ENV === "production";

  res.cookie("jwt", token, {
    maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days
    httpOnly: true, // Prevent JavaScript access
    sameSite: isProduction ? "none" : "lax", // Use "none" for cross-origin in production, "lax" for local dev
    secure: isProduction, // Use secure cookies in production
  });
};

export default generateTokenAndSetCookie;
