import { Router } from "express";
import { Op } from "sequelize";
import { User } from "../../models/User";
import "dotenv/config";
import bcrypt from "bcrypt";
import fs from "fs";
import jsonwebtoken from "jsonwebtoken";

const PRIVATEKEY = fs.readFileSync("private.key", "utf-8");

const login = Router();

login.route("/login")
    .post(async (req, res) => {
        const body = req.body;
        try {
            if (!body.username || !body.password) {
                throw new Error("username/email and password attribute required");
            }
            
            const user: User | null = await User.findOne({where: {
                [Op.or]: [
                    {Username: body.username}, 
                    {Email: body.username}
                ]
            }});

            if (user) {
                bcrypt.compare(body.password, user.Password, (err, result) => {
                    if (err) {
                        res.status(500).send(err);
                    } else if (result) {
                        const token = jsonwebtoken.sign({
                            user: user.Username
                        }, PRIVATEKEY, { expiresIn: "1h", algorithm: "RS256"});

                        res.status(200).cookie("token", token).send("Logged in!");
                    } else {
                        res.status(400).send("Wrong Username/Password!");
                    }
                });
            } else {
                res.status(400).send("Wrong Username/Password!");
            }
        } catch(error) {
            if (typeof error === "string") {
                res.status(400).send(error);
            } else if (error instanceof Error){
                res.status(400).send(error.message);
            }
        }
    });

export default login;
