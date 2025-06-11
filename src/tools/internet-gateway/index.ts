import {
  attachInternetGatewaySchema,
  createInternetGatewaySchema,
  deleteInternetGatewaySchema,
  detachInternetGatewaySchema,
  listInternetGatewaysSchema,
} from "@/schema/internet-gateway";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import {
  attachInternetGateway,
  createInternetGateway,
  deleteInternetGateway,
  detachInternetGateway,
  listInternetGateways,
} from "./handler";

export const registerInternetGatewayTools = (server: McpServer): void => {
  server.tool(
    "list-internet-gateways",
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
    "create-internet-gateway",
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

  server.tool(
    "delete-internet-gateway",
    "Delete an internet gateway by ID in the given region",
    deleteInternetGatewaySchema,
    {
      destructiveHint: true,
      openWorldHint: true,
      readOnlyHint: false,
      idempotentHint: true,
      title: "Delete an internet gateway",
    },
    async (args) => await deleteInternetGateway(args)
  );

  server.tool(
    "attach-internet-gateway",
    "Attach an internet gateway to a VPC",
    attachInternetGatewaySchema,
    {
      destructiveHint: false,
      openWorldHint: true,
      readOnlyHint: false,
      idempotentHint: true,
      title: "Attach an internet gateway to a VPC",
    },
    async (args) => await attachInternetGateway(args)
  );

  server.tool(
    "detach-internet-gateway",
    "Detach an internet gateway from a VPC",
    detachInternetGatewaySchema,
    {
      destructiveHint: false,
      openWorldHint: true,
      readOnlyHint: false,
      idempotentHint: true,
      title: "Detach an internet gateway from a VPC",
    },
    async (args) => await detachInternetGateway(args)
  );
};
