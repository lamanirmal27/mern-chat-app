import session from "express-session";
import generateTokenAndSetCookie from "../utils/generateToken.js";

const sessionConfig = session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === "production", // Only use secure in production
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    httpOnly: true,
  },
});

// export const initializeSession = (req, res, next) => {


//   if (req.user) {
//     generateTokenAndSetCookie(req.user._id, res);
//   }
//   next();
// };

export default sessionConfig;
