// Config
import "reflect-metadata";
import "dotenv/config";

// Packages
import express from "express";
import cors from "cors";

// Routes
import { apiRouter } from "./routes";

// Dependency injection
import "../../container";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", apiRouter);

export { app };
