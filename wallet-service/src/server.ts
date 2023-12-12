import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { env } from "./core/env";
import authMiddleware from "./core/middlewares";
import router from "./routes";

dotenv.config();

const app: Express = express();
const port = env.PORT;

app.use(authMiddleware);
app.use(express.json());
app.use(router);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
