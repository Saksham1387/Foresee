import { type NextFunction, type Request, type Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "./config";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    if (!token) {
        res.status(401).json({ error: "Unauthorized", success: false });
        return;
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    if (!decoded) {
        res.status(401).json({ error: "Unauthorized", success: false });
        return;
    }

    req.userId = (decoded as { id: string }).id;
    next();
}