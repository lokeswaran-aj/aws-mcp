import { createSubnetSchema, listSubnetsSchema } from "@/schema/subnet";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { createSubnet, listSubnets } from "./handler";

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
};
