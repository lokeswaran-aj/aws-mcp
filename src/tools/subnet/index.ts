import {
  createSubnetSchema,
  deleteSubnetSchema,
  listSubnetsSchema,
  updateSubnetAttributeSchema,
} from "@/schema/subnet";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import {
  createSubnet,
  deleteSubnet,
  listSubnets,
  updateSubnetAttribute,
} from "./handler";

export const registerSubnetTools = async (server: McpServer): Promise<void> => {
  server.tool(
    "subnet-list-subnets",
    "List all the subnets in the given region",
    listSubnetsSchema,
    {
      title: "List all the subnets",
      destructiveHint: false,
      openWorldHint: true,
      readOnlyHint: true,
      idempotentHint: true,
    },
    async (args) => await listSubnets(args)
  );
  server.tool(
    "subnet-create-subnet",
    "Create a subnet in the given region",
    createSubnetSchema,
    {
      title: "Create a subnet",
      destructiveHint: false,
      openWorldHint: true,
      readOnlyHint: false,
      idempotentHint: true,
    },
    async (args) => await createSubnet(args)
  );
  server.tool(
    "subnet-update-subnet-attribute",
    "Update a subnet attributes by subnet ID in the given region",
    updateSubnetAttributeSchema,
    {
      title: "Update a subnet attribute",
      destructiveHint: false,
      openWorldHint: true,
      readOnlyHint: false,
      idempotentHint: true,
    },
    async (args) => await updateSubnetAttribute(args)
  );
  server.tool(
    "subnet-delete-subnet",
    "Delete a subnet by subnet ID in the given region",
    deleteSubnetSchema,
    {
      title: "Delete a subnet",
      destructiveHint: true,
      openWorldHint: true,
      readOnlyHint: false,
      idempotentHint: true,
    },
    async (args) => await deleteSubnet(args)
  );
};
