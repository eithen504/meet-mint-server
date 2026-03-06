
import mongoose, { Document, Model } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  profileImage: string;
  clerkId: string;
  createdAt: Date;
  updatedAt: Date;
}

export type StreamUser = {
  id: string;
  name: string;
  image?: string;
};

export type Language = "javascript" | "python" | "java";

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}