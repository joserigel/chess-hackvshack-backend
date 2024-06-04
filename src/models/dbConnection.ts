import "dotenv/config";
import { Sequelize } from "sequelize";

export const sequelize = new Sequelize(
    process.env.MYSQL_DB as string,
    process.env.MYSQL_USER as string,
    process.env.MYSQL_PASS as string,
    {
        host: process.env.MYSQL_HOST as string,
        dialect: "mysql"
    }
);

export const initDBConnection = () => {
    sequelize.authenticate().then(() => {
        console.log("MySQL: connection established!");
    }).catch((error) => {
        console.log("MySQL: connection error =", error);
    });

    sequelize.sync().then(() => {
        console.log("MySQL: synced!");
    }).catch((error) => {
        console.log("MySQL: syncing failed =", error);
    });
};
