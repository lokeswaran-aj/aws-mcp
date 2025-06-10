import {
  createInternetGatewaySchema,
  listInternetGatewaysSchema,
} from "@/schema/internet-gateway";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { createInternetGateway, listInternetGateways } from "./handler";

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

  server.tool(
    "internet-gateway-create-internet-gateway",
    "Create a new internet gateway in the given region",
    createInternetGatewaySchema,
    {
      destructiveHint: false,
      openWorldHint: true,
      readOnlyHint: false,
      idempotentHint: false,
      title: "Create a new internet gateway",
    },
    async (args) => await createInternetGateway(args)
  );
};
