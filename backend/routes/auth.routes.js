import express from "express";
import passport from "passport";
import authController from "../controllers/auth.controller.js";
import generateTokenAndSetCookie from "../utils/generateToken.js";

const router = express.Router();
const CLIENT_URL = "http://localhost:5173";

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
    failureRedirect: CLIENT_URL + "/login",
  }),
  (req, res) => {
    try {
      generateTokenAndSetCookie(req.user._id.toString(), res);
      // Redirect to frontend with success flag
      res.redirect(CLIENT_URL + "/auth-success");
    } catch (error) {
      console.log("error", error);
      res.redirect(CLIENT_URL + "/login");
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
