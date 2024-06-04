import { Router } from "express";
import { User } from "../../models/User";
import bcrypt from "bcrypt";
import "dotenv/config";

const register = Router();

register.route("/register")
    .post(async (req, res) => {
        const body = req.body;
        try {
            // All Attributes should be present
            if (!body.username || !body.password || !body.email) {
                throw new Error("username, password and email attribute required!");
            }

            // No other user should have the same username
            if (await User.findOne({where: {Username: body.username}})) {
                throw new Error("username already taken!");
            }

            // No other user should have the same email
            if (await User.findOne({where: {Email: body.email}})) {
                throw new Error("email has been used!");
            }
            
            // Hash and save to database
            bcrypt.hash(
                body.password, 
                parseInt(process.env.SALTROUND as string), 
                (err, hash) => {
                    if (err) {
                        res.status(500).send(err);
                    } else {
                        User.create({
                            Username: body.username,
                            Password: hash,
                            Email: body.email
                        }).then(() => {
                            res.status(201).send("success!");
                        }).catch((error) => {
                            res.status(500).send(error);
                        });
                    }
                }
            );
        } catch(error) {
            if (typeof error === "string") {
                res.status(400).send(error);
            } else if (error instanceof Error){
                res.status(400).send(error.message);
            }
        }
    });

export default register;