// Packages
import express from "express";

// Routes
import { apiRouter } from "./routes";

const app = express();

app.use(express.json());
app.use("/api", apiRouter);

export { app };
