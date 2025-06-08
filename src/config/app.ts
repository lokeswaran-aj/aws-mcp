import { config } from "dotenv";

config();

export const appConfig = {
  port: process.env.PORT || 8080,
  server: {
    name: "aws",
    version: "0.0.1",
    description: "AWS MCP Server",
  },
  cors: {
    enabled: process.env.CORS_ENABLED === "true",
    origin: process.env.CORS_ORIGIN || "*",
  },
  awsCredentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID ?? "",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY ?? "",
    sessionToken: process.env.AWS_SESSION_TOKEN ?? "",
  },
  defaultRegion: process.env.DEFAULT_REGION || "ap-south-1",
};
