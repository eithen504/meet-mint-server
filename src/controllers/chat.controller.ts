import { chatClient } from "../lib/stream.js";
import { type Response, type Request } from "express";

async function getStreamToken(req: Request, res: Response) {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { clerkId, name, profileImage } = req.user;

    const token = chatClient.createToken(clerkId);

    return res.status(200).json({
      token,
      userId: clerkId,
      userName: name,
      userImage: profileImage,
    });

  } catch (error) {
    console.log("Error in getStreamToken controller:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

export {
  getStreamToken
}