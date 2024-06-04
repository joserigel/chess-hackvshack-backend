import express from "express";
import { initDBConnection } from "./models/dbConnection";
import "dotenv/config";
import controllers from "./controllers";
import authentification from "./middleware/authentification";
import login from "./controllers/authentification/login";
import register from "./controllers/authentification/register";
import cookieParser from "cookie-parser";
import health from "./controllers/health";

const app = express();
app.use(express.json());
app.use(cookieParser());


// Exceptions to authentification
app.use(health);
app.use(login);
app.use(register);

// Controllers
app.use(authentification);
app.use(controllers);


initDBConnection();

app.listen(process.env.PORT, () => {
  console.log(`app listening on port ${process.env.PORT}`);
});