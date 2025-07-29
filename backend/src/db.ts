import mongoose, { model, Schema } from "mongoose";

// User Schema
const UserSchema = new Schema(
{
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
  },
  { timestamps: true } // Adds 'createdAt' and 'updatedAt' fields
);

export const UserModel = model("User", UserSchema);


// OTP Schema with automatic expiration (TTL)
// const OTPSchema = new mongoose.Schema(
//   {
//     email: { type: String, required: true },
//     otp: { type: String, required: true },
//     createdAt: { type: Date, default: Date.now, expires: 300 }, // expires in 5 minutes
//   },
//   { timestamps: true }
// );

// export const OTPModel = mongoose.model("OTP", OTPSchema);

// Content Schema
const ContentSchema = new Schema(
  {
    title: String,
    Link: String,
    tags: [{ type: mongoose.Types.ObjectId, ref: "tag" }],
    userId: [{ type: mongoose.Types.ObjectId, ref: "User", required: true }],
  },
  { timestamps: true } // Adds 'createdAt' and 'updatedAt' fields
);

export const ContentModel = model("Content", ContentSchema);

// Link Schema
const LinkSchema = new Schema({
    hash: String,
    userId: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
});

export const LinkModel = model("Links", LinkSchema);
