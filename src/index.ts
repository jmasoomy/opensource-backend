import express, {Request, Response } from "express";
import postsRoutes from "./ports/rest/routes/posts";
import authRoutes from "./ports/rest/routes/auth";
import {verifyToken} from "./ports/rest/middleware/auth";

const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
    res.status(200).json({
        message: "Backend Api is running"
    });
});

app.get("/health", (req: Request, res: Response) => {
    res.status(200).json({
        status: "ok"
    });
});

app.get("/protected", verifyToken, (req, res) => {
    return res.status(200).json({
        message: "Accessed protected route"
    });
});

app.use("/posts", postsRoutes);
app.use("/auth", authRoutes);

app.listen(PORT, () => {
    console.log('Server is running on http://localhost:3000');
});