import express from "express";
import User from "../models/User.js";

const router = express.Router();

router.post("/register", async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "Email already in use" });
      }
  
      const newUser = new User({ email, password });
      await newUser.save();
  
      req.session.user = { id: newUser._id, email: newUser.email };
      res.status(201).json({ message: "User registered successfully", userId: newUser._id });
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
});


router.post("/login", async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await User.findOne({ email });
      if (!user || user.password !== password) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
  
      req.session.user = { id: user._id, email: user.email };
      res.json({ message: "Login successful", userId: user._id });
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
});

router.delete("/logout", (req, res) => {
  req.session.destroy(() => {
      res.json({ message: "Logged out successfully" });
  });
});

router.get("/status", (req, res) => {
  if (req.session.user) {
      return res.json({ loggedIn: true, user: req.session.user });
  }
  return res.json({ loggedIn: false });
});

// router.get("/me", async (req, res) => {
//     if (!req.session.user) {
//       return res.status(401).json({ message: "Not logged in" });
//     }
  
//     const user = await User.findById(req.session.user.id).select("-password");
//     if (!user) return res.status(404).json({ message: "User not found" });
  
//     res.json(user);
// });

export default router;