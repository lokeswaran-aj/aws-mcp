import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { registerRdsTools } from "./tools/rds";
import { registerS3Tools } from "./tools/s3";

export const server = new McpServer(
  {
    name: "aws",
    version: "0.0.1",
    description: "AWS MCP Server",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// Register all tools
void registerRdsTools(server);
void registerS3Tools(server);
