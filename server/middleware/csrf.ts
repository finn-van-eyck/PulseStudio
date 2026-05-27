import { Request, Response, NextFunction } from "express";
import Tokens from "csrf";

const tokens = new Tokens();
const secret = process.env.CSRF_SECRET || "fallback_geheim";

export const verifyCSRF = (req: Request, res: Response, next: NextFunction) => {
    const userToken = req.body._csrf;
    if (!tokens.verify(secret, userToken)) {
        return res.status(403).send("CSRF-fout: Ongeldig of ontbrekend token.");
    }
    next();
};