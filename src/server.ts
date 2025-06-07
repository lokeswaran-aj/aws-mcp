import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { registerRdsTools } from "./tools/rds";

export const server = new McpServer({
  name: "aws",
  version: "0.0.1",
  description: "AWS MCP Server",
});

// Register all tools
registerRdsTools(server);
