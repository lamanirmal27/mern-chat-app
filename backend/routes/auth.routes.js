import express from "express";
import passport from "passport";
import authController from "../controllers/auth.controller.js";
import generateTokenAndSetCookie from "../utils/generateToken.js";

const router = express.Router();
const REDIRECT_URL =
  process.env.DEV_ENV === "development"
    ? "http://localhost:5173"
    : process.env.BACKEND_URL;

// Google OAuth routes
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: REDIRECT_URL + "/login",
  }),
  (req, res) => {
    try {
      generateTokenAndSetCookie(req.user._id.toString(), res);
      // Redirect to frontend with success flag
      res.redirect(REDIRECT_URL + "/auth-success");
    } catch (error) {
      console.log("error", error);
      res.redirect(REDIRECT_URL + "/login");
    }
  }
);

// Auth status check route
router.get("/auth-status", (req, res) => {
  try {
    res.status(200).json({
      authenticated: req.isAuthenticated(),
      user: req.user
        ? {
            _id: req.user._id,
            username: req.user.username.split("@")[0],
            fullName: req.user.fullName,
            profilePicture: req.user.profilePicture,
          }
        : null,
    });
  } catch (error) {
    console.error("Status check error:", error);
    res.status(500).json({
      authenticated: false,
      error: "Internal server error",
    });
  }
});

//default auth route
router
  .post("/login", authController.login)
  .post("/logout", authController.logout)
  .post("/signup", authController.signup);

export default router;
