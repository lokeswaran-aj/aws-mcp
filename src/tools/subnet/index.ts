import {
  createSubnetSchema,
  deleteSubnetSchema,
  listSubnetsSchema,
  updateSubnetAttributeSchema,
} from "@/schema/subnet";
import { server } from "@/server";
import {
  createSubnet,
  deleteSubnet,
  listSubnets,
  updateSubnetAttribute,
} from "./handler";

export const registerSubnetTools = async (): Promise<void> => {
  server.addTool({
    name: "list-subnets",
    description: "List all the subnets in the given region",
    parameters: listSubnetsSchema,
    annotations: {
      title: "List all the subnets",
      destructiveHint: false,
      openWorldHint: true,
      readOnlyHint: true,
      idempotentHint: true,
    },
    execute: async (args, context) => await listSubnets(args, context),
  });
  server.addTool({
    name: "create-subnet",
    description: "Create a subnet in the given region",
    parameters: createSubnetSchema,
    annotations: {
      title: "Create a subnet",
      destructiveHint: false,
      openWorldHint: true,
      readOnlyHint: false,
      idempotentHint: true,
    },
    execute: async (args, context) => await createSubnet(args, context),
  });
  server.addTool({
    name: "update-subnet-attribute",
    description: "Update a subnet attributes by subnet ID in the given region",
    parameters: updateSubnetAttributeSchema,
    annotations: {
      title: "Update a subnet attribute",
      destructiveHint: false,
      openWorldHint: true,
      readOnlyHint: false,
      idempotentHint: true,
    },
    execute: async (args, context) =>
      await updateSubnetAttribute(args, context),
  });
  server.addTool({
    name: "delete-subnet",
    description: "Delete a subnet by subnet ID in the given region",
    parameters: deleteSubnetSchema,
    annotations: {
      title: "Delete a subnet",
      destructiveHint: true,
      openWorldHint: true,
      readOnlyHint: false,
      idempotentHint: true,
    },
    execute: async (args, context) => await deleteSubnet(args, context),
  });
};
