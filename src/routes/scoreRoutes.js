import express from "express";
import Score from "../models/Score.js";

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const scores = await Score.find({ userId: req.session.user.id }).sort({ points: -1, date: -1 });
        const highest = scores.length > 0 ? scores[0].points : 0;

        res.json({ highest, scores });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

router.post("/", async (req, res) => {
    try {
        // console.log("hi")
        // console.log(req.body)
        const { points } = req.body;
        if (!points && points !== 0) {
            return res.status(400).json({ message: "Points are required" });
        }

        const newScore = new Score({
            userId: req.session.user.id,
            points
        });
        
        await newScore.save();
        res.status(201).json({ message: "Score saved!" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

export default router;