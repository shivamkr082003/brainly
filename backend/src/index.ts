import dotenv from 'dotenv';
dotenv.config();


import express from "express";

import { random } from "./utils";
import jwt from "jsonwebtoken";
import { ContentModel, LinkModel, UserModel } from "./db";
import { JWT_SECRET } from "./config";
import { userMiddleware } from "./middleware";
import cors from "cors";
import { z } from "zod";
import bcrypt from "bcrypt"; // Importing bcrypt for password hashing

// import { z } from "zod";


const app = express();
app.use(express.json()); // Middleware to parse JSON request bodies.
app.use(cors()); // Middleware to allow cross-origin re


// Route 1: User Signup
app.post("/api/v1/signup", async function (req, res) {
    // Input validation using zod 
    const requiredBody = z.object({
        email: z.string().email().min(5), 
        password: z.string()
            .min(8) 
            .regex(/[A-Z]/) 
            .regex(/[a-z]/)
            .regex(/[0-9]/)
            .regex(/[^A-Za-z0-9]/)
    });
     
      

    const parsedDataSuccess = requiredBody.safeParse(req.body);

    if (!parsedDataSuccess.success) {
         res.status(400).json({
            message: "Incorrect Format",
            error: parsedDataSuccess.error
        });
    }

    const { email, password } = req.body;
    console.log(req.body);

    // Check if the email already exists in the database
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
         res.status(400).json({
            message: "Email already exists"
        });
    }

    const hashedPassword = await bcrypt.hash(password, 5);
    
    try {
        await UserModel.create({
            email,
            password: hashedPassword,
        });
        res.json({
            message: "Sign-up Successful"
        });
    } catch (e) {
        res.status(400).json({
            message: "Something went wrong during sign-up",
           
        });
    }
});




// Route 2: User Signin
app.post("/api/v1/signin", async (req, res) => {
   


    const requireBody = z.object({
        email: z.string().email(),
        password: z.string().min(6),
    });

     // Parse and validate the request body data
     const parseDataWithSuccess = requireBody.safeParse(req.body);
     // If the data format is incorrect, send an error message to the client
     if(!parseDataWithSuccess){
          res.json({
             message: "Incorrect data format",
            
         });
     }
 
     // Get the email and password from the request body
     const {email,password} = req.body;
     

   

    // Find a user with the provided credentials.
    const existingUser = await UserModel.findOne({ email, password });
    if (existingUser) {
        // Generate a JWT token with the user's ID.
        const token = jwt.sign({ id: existingUser._id }, JWT_SECRET);
        res.json({ token }); // Send the token in response.
    } else {
        // Send error response for invalid credentials.
        res.status(403).json({ message: "Incorrect credentials" });
    }
});

// Route 3: Add Content
app.post("/api/v1/content", userMiddleware, async (req, res) => {
    const { link, type, title } = req.body;
    // Create a new content entry linked to the logged-in user.
    await ContentModel.create({
        link,
        type,
        title,
        userId: req.userId, // userId is added by the middleware.
        tags: [] // Initialize tags as an empty array.
    });

    res.json({ message: "Content added" }); // Send success response.
});

// Route 4: Get User Content
app.get("/api/v1/content", userMiddleware, async (req, res) => {
    //@ts-ignore
    const userId = req.userId;  // User ID is fetched from middleware
    // Fetch all content associated with the user ID and populate username
    // The `populate` function is used to include additional details from the referenced `userId`.
    // For example, it will fetch the username linked to the userId.
    // Since we specified "username", only the username will be included in the result, 
    // and other details like password won’t be fetched.
    const content = await ContentModel.find({ userId: userId }).populate("userId", "username");
    res.json(content);  // Send the content as response
});

// Route 5: Delete User Content
app.delete("/api/v1/content", userMiddleware, async (req, res) => {
    const contentId = req.body.contentId;

    // Delete content based on contentId and userId.
    await ContentModel.deleteMany({ contentId, userId: req.userId });
    res.json({ message: "Deleted" }); // Send success response.
});

// Route 6: Share Content Link
app.post("/api/v1/brain/share", userMiddleware, async (req, res) => {
    const { share } = req.body;
    if (share) {
        // Check if a link already exists for the user.
        const existingLink = await LinkModel.findOne({ userId: req.userId });
        if (existingLink) {
            res.json({ hash: existingLink.hash }); // Send existing hash if found.
            return;
        }

        // Generate a new hash for the shareable link.
        const hash = random(10);
        await LinkModel.create({ userId: req.userId, hash });
        res.json({ hash }); // Send new hash in the response.
    } else {
        // Remove the shareable link if share is false.
        await LinkModel.deleteOne({ userId: req.userId });
        res.json({ message: "Removed link" }); // Send success response.
    }
});

// Route 7: Get Shared Content
app.get("/api/v1/brain/:shareLink", async (req, res) => {
    const hash = req.params.shareLink;

    // Find the link using the provided hash.
    const link = await LinkModel.findOne({ hash });
    if (!link) {
        res.status(404).json({ message: "Invalid share link" }); // Send error if not found.
        return;
    }

    // Fetch content and user details for the shareable link.
    const content = await ContentModel.find({ userId: link.userId });
    const user = await UserModel.findOne({ _id: link.userId });

    if (!user) {
        res.status(404).json({ message: "User not found" }); // Handle missing user case.
        return;
    }

    res.json({
        email: user.email,
        content
    }); // Send user and content details in response.
});

//Start the server
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});















