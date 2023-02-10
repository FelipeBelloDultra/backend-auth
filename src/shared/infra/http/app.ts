import express from "express";

const app = express();

app.use(express.json());

app.get("/api", (req, res) => {
  return res.status(200).json({ message: "Hello World!" });
});

export { app };
