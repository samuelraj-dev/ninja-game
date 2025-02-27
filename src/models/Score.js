import mongoose from "mongoose";

const ScoreSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    points: { type: Number, required: true },
    date: { type: Date, default: Date.now }
});

const Score = mongoose.model("Score", ScoreSchema);

export default Score;