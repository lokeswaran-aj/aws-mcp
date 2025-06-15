import {
  attachInternetGatewaySchema,
  createInternetGatewaySchema,
  deleteInternetGatewaySchema,
  detachInternetGatewaySchema,
  listInternetGatewaysSchema,
} from "@/schema/internet-gateway";
import { server } from "@/server";
import {
  attachInternetGateway,
  createInternetGateway,
  deleteInternetGateway,
  detachInternetGateway,
  listInternetGateways,
} from "./handler";

export const registerInternetGatewayTools = (): void => {
  server.addTool({
    name: "list-internet-gateways",
    description: "List all internet gateways in the given region",
    parameters: listInternetGatewaysSchema,
    annotations: {
      destructiveHint: false,
      openWorldHint: true,
      readOnlyHint: true,
      idempotentHint: true,
      title: "List all internet gateways",
    },
    execute: async (args, context) => await listInternetGateways(args, context),
  });

  server.addTool({
    name: "create-internet-gateway",
    description: "Create a new internet gateway in the given region",
    parameters: createInternetGatewaySchema,
    annotations: {
      destructiveHint: false,
      openWorldHint: true,
      readOnlyHint: false,
      idempotentHint: false,
      title: "Create a new internet gateway",
    },
    execute: async (args, context) =>
      await createInternetGateway(args, context),
  });

  server.addTool({
    name: "delete-internet-gateway",
    description: "Delete an internet gateway by ID in the given region",
    parameters: deleteInternetGatewaySchema,
    annotations: {
      destructiveHint: true,
      openWorldHint: true,
      readOnlyHint: false,
      idempotentHint: true,
      title: "Delete an internet gateway",
    },
    execute: async (args, context) =>
      await deleteInternetGateway(args, context),
  });

  server.addTool({
    name: "attach-internet-gateway",
    description: "Attach an internet gateway to a VPC",
    parameters: attachInternetGatewaySchema,
    annotations: {
      destructiveHint: false,
      openWorldHint: true,
      readOnlyHint: false,
      idempotentHint: true,
      title: "Attach an internet gateway to a VPC",
    },
    execute: async (args, context) =>
      await attachInternetGateway(args, context),
  });

  server.addTool({
    name: "detach-internet-gateway",
    description: "Detach an internet gateway from a VPC",
    parameters: detachInternetGatewaySchema,
    annotations: {
      destructiveHint: false,
      openWorldHint: true,
      readOnlyHint: false,
      idempotentHint: true,
      title: "Detach an internet gateway from a VPC",
    },
    execute: async (args, context) =>
      await detachInternetGateway(args, context),
  });
};
