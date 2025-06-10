import { listInternetGatewaysSchema } from "@/schema/internet-gateway";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { listInternetGateways } from "./handler";

export const registerInternetGatewayTools = (server: McpServer): void => {
  server.tool(
    "internet-gateway-list-internet-gateways",
    "List all internet gateways in the given region",
    listInternetGatewaysSchema,
    {
      destructiveHint: false,
      openWorldHint: true,
      readOnlyHint: true,
      idempotentHint: true,
      title: "List all internet gateways",
    },
    async (args) => await listInternetGateways(args)
  );
};
