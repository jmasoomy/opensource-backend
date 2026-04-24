import {Request, Response, NextFunction} from "express";
import jwt from "jsonwebtoken";

const secretyKey = "jasim_secret";

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader?.split(" ")[1];

    // No token handler
    if (!token) {
        return res.status(403).json({
            message: "Token required"
        });
    }

    try {
        const verified = jwt.verify(token, secretyKey);
        (req as any).user = verified;
        next();
    } catch (error) {
        return res.status(401).json({
            message: "Invalid token"
        });
    }
};