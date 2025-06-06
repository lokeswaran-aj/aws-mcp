import { config } from "dotenv";
import express from "express";

config();

const app = express();
const port = process.env.PORT || 8081;

app.use(express.json());

app.get("/", (_req, res) => {
  res.sendStatus(200);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
