import { type Request, type Response, type NextFunction } from "express";
import { getAuth, requireAuth } from "@clerk/express";
import User from "../models/user.model";

export const protectRoute = [
  requireAuth(),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const clerkId = getAuth(req).userId;

      if (!clerkId) {
        return res.status(401).json({
          message: "Unauthorized - invalid token",
        });
      }

      const user = await User.findOne({ clerkId });
 
      if (!user) {
        return res.status(404).json({
          message: "User not found",
        });
      }

      req.user = user;

      next();
    } catch (error) {
      console.error("Error in protectRoute middleware", error);
      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  },
];