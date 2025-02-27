import express from "express";
import session from "express-session";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import mongoose from "mongoose";
import MongoStore from "connect-mongo";
import authRoutes from "./routes/authRoutes.js";
import scoreRoutes from "./routes/scoreRoutes.js";
import path from "path";
import { fileURLToPath } from "url";
import { requireGuest, requireAuth } from "./middlewares/auth.js"

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();

app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:4173', 'http://localhost:4174', 'http://localhost:5000'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
}))
app.use(express.json());
app.use(cookieParser());

const mongoURI = process.env.MONGO_URI
mongoose.connect(mongoURI)
    .then(() => console.log("db connected"))
    .catch(err => console.error("db connection error: ", err));

app.use(session({
    store: MongoStore.create({ mongoUrl: mongoURI }),
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: false,
        maxAge: 1000 * 60 * 60 * 24,
    }
}))

// ROUTES

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

app.get("/scoreboard", requireAuth, (req, res) => {
    res.sendFile(path.join(__dirname, "..", "public", "scoreboard", "index.html"));
});

app.get("/login", requireGuest, (req, res) => {
    res.sendFile(path.join(__dirname, "..", "public", "login", "index.html"));
});

app.get("/register", requireGuest, (req, res) => {
    res.sendFile(path.join(__dirname, "..", "public", "register", "index.html"));
});


app.use(express.static(path.join(__dirname, "..", "public")));


app.get("/api/healthcheck", (req, res) => {
    res.status(200).send("ok");
});

app.use("/api/auth", authRoutes)
app.use("/api/scores", requireAuth, scoreRoutes)

// app.get("*", (req, res) => {
//     res.sendFile(path.join(__dirname, "..", "public", "index.html"));
// });

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));