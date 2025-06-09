import { appConfig } from "@/config/app";
import { healthRoutes } from "@/routes/health.route";
import { mcpRoutes } from "@/routes/mcp.route";
import express from "express";

const app = express();

app.use(express.json());

// Routes
app.use("/health", healthRoutes);
app.use("/", mcpRoutes);

app.listen(appConfig.port, () => {
  console.log(`Server is running on port ${appConfig.port}`);
});
