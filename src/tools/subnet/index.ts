import { listSubnetsSchema } from "@/schema/subnet";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { listSubnets } from "./handler";

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
};
