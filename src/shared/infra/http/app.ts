// Packages
import express from "express";
import cors from "cors";

// Routes
import { apiRouter } from "./routes";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", apiRouter);

export { app };
