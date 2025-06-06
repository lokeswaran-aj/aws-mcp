import { config } from "dotenv";
import express from "express";
import { handleMcpRequest } from "./controllers/mcpController";
import { mcpErrorHandler } from "./middleware/errorHandler";

config();

const app = express();
const port = process.env.PORT || 8081;

app.use(express.json());
app.use(mcpErrorHandler);

app.get("/", (_req, res) => {
  res.sendStatus(200);
});

app.post("/mcp", async (req, res, next) => {
  try {
    await handleMcpRequest(req, res);
  } catch (error) {
    next(error);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
