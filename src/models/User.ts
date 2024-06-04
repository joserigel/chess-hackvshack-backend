import { DataTypes, Model } from "sequelize";
import { sequelize } from "./dbConnection";

export class User extends Model {
    declare ID: number;
    declare Username: string;
    declare Password: string;
    declare Email: string;
}

User.init({
    ID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    Username: {
        type: DataTypes.STRING(32),
        allowNull: false
    },
    Password: {
        type: DataTypes.STRING(72).BINARY,
        allowNull: false
    },
    Email: {
        type: DataTypes.STRING(255),
        allowNull: false
    }
}, { sequelize, modelName: "User" });