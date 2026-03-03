import express, { json } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDB } from './lib/db.js';
import { serve } from "inngest/express";
import { inngest, functions } from './lib/inngest.js';

dotenv.config();

const app = express();
const port = 3000;

app.use(cors({
    origin: [process.env.ALLOWED_ORIGIN as string],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    credentials: true,
}));

app.use(json());

app.use("/api/inngest", serve({ client: inngest, functions }));

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "🚀 Server is running successfully!",
  });
});

const startServer = async () => {
    try {
        await connectDB();
        app.listen(port, () => {
            connectDB();
            console.log(`Example app listening on port ${port}`);
        });
    } catch (error) {
        console.log("Error starting the server", error);
    }
}

startServer();