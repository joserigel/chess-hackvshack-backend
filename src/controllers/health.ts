import { Router } from "express";
import { sequelize } from "../models/dbConnection";

const health = Router();

health.route("/health")
    .get(async (req, res) => {
            sequelize.authenticate()
            .then(() => {
                res.status(200).send("OK");
            }).catch((err) => {
                res.status(500).send(err);
            });
    });

export default health;

