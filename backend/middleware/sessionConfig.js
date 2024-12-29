import MongoStore from "connect-mongo";
import session from "express-session";

const sessionConfig = session({

  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGODB_URI,
    ttl: 14 * 24 * 60 * 60
  }),
  // cookie: {
  //   secure: process.env.NODE_ENV === "production", // Only use secure in production
  //   maxAge: 24 * 60 * 60 * 1000, // 24 hours
  //   sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  //   httpOnly: true,
  // },
});

export default sessionConfig;
