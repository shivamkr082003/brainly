import dotenv from "dotenv";
dotenv.config();

import express from "express";
import jwt from "jsonwebtoken";
import cors from "cors";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";
import { random } from "./utils";
import { ContentModel, LinkModel, UserModel, OtpModel } from "./db"; // Added OtpModel
import { JWT_SECRET } from "./config";
import { userMiddleware } from "./middleware";


const app = express();
app.use(express.json());
app.use(cors());

// -------------------- USER SIGNUP --------------------

app.post("/api/v1/signup", async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    try {
        const hashedPassword = await bcrypt.hash(password, 10); // Hash password
        await UserModel.create({ email, password: hashedPassword });
        res.json({ message: "User signed up" });
    } catch (e) {
        res.status(409).json({ message: "User already exists" });
    }
});

// -------------------- USER SIGNIN --------------------


app.post("/api/v1/signin", async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    const existingUser = await UserModel.findOne({ email });
    if (existingUser?.password && await bcrypt.compare(password, existingUser.password)) {

        const token = jwt.sign({ id: existingUser._id }, JWT_SECRET);
        res.json({ token });
    } else {
        res.status(403).json({ message: "Incorrect credentials" });
    }
});

// -------------------- OTP SEND --------------------

app.post("/api/v1/send-otp", async (req, res) => {
    const { email } = req.body;

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Save OTP to DB with expiry
    await OtpModel.findOneAndUpdate(
        { email },
        { otp, expiresAt: new Date(Date.now() + 5 * 60 * 1000) }, // 5 mins expiry
        { upsert: true }
    );

    // Send OTP via email
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Your OTP Code",
        text: `Your OTP is ${otp}. It expires in 5 minutes.`,
    });

    res.json({ message: "OTP sent to email" });
});

// -------------------- OTP VERIFY --------------------

app.post("/api/v1/verify-otp", async (req, res)=> {
    const { email, otp } = req.body;

    const record = await OtpModel.findOne({ email });

    if (!record || record.otp !== otp || new Date() > new Date(record.expiresAt || 0)) {

        res.status(400).json({ message: "Invalid or expired OTP" });
        return;
    }

    await OtpModel.deleteOne({ email }); // Invalidate OTP after use

    res.json({ message: "OTP verified" });
});

// -------------------- ADD CONTENT --------------------

app.post("/api/v1/content", userMiddleware, async (req, res) => {
    const { link, type, title } = req.body;

    await ContentModel.create({
        link,
        type,
        title,
        userId: req.userId,
        tags: []
    });

    res.json({ message: "Content added" });
});

// -------------------- GET USER CONTENT --------------------

app.get("/api/v1/content", userMiddleware, async (req, res) => {
    const userId = req.userId;
    const content = await ContentModel.find({ userId }).populate("userId", "username");
    res.json(content);
});

// -------------------- DELETE CONTENT --------------------

app.delete("/api/v1/content", userMiddleware, async (req, res) => {
    const contentId = req.body.contentId;
    await ContentModel.deleteMany({ contentId, userId: req.userId });
    res.json({ message: "Deleted" });
});

// -------------------- SHARE LINK --------------------

app.post("/api/v1/brain/share", userMiddleware,async (req, res) => {
    const { share } = req.body;
    if (share) {
        const existingLink = await LinkModel.findOne({ userId: req.userId });
        if (existingLink) {

         res.json({ hash: existingLink.hash });
         return;
        }
        const hash = random(10);
        await LinkModel.create({ userId: req.userId, hash });
        res.json({ hash });
    } else {
        await LinkModel.deleteOne({ userId: req.userId });
        res.json({ message: "Removed link" });
    }
});

// -------------------- VIEW SHARED LINK --------------------

app.get("/api/v1/brain/:shareLink", async (req, res)=> {
    const hash = req.params.shareLink;

    const link = await LinkModel.findOne({ hash });
    if (!link) {

     res.status(404).json({ message: "Invalid share link" });
     return;
    }
    const content = await ContentModel.find({ userId: link.userId });
    const user = await UserModel.findOne({ _id: link.userId });
    if (!user) {

    res.status(404).json({ message: "User not found" });
    return ;
    }
    res.json({ email: user.email, content });
});

// -------------------- START SERVER --------------------

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});





