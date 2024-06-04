import { NextFunction, Response, Request } from "express";
import jsonwebtoken, { JwtPayload } from "jsonwebtoken";
import fs from "fs";

const PRIVATEKEY = fs.readFileSync("private.key", "utf-8");

const authentification = (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.token ?? "";
    try {
        const decodedToken: JwtPayload | string = jsonwebtoken.verify(token, PRIVATEKEY);
        if (typeof decodedToken === "object") {
            next();
        } else {
            throw new Error("Invalid Token!");
        }
    } catch (error) {
        if (typeof error === "string") {
            res.status(400).send(error);
        } else if (error instanceof Error){
            res.status(400).send(error.message);
        }
    }
};

export default authentification;