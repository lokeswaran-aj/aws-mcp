import { listVpcsSchema } from "@/schema/vpc";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { listVpcs } from "./handler";

export const registerVpcTools = async (server: McpServer): Promise<void> => {
  server.tool(
    "vpc-list-vpcs",
    "List all the VPCs",
    listVpcsSchema,
    {
      destructiveHint: false,
      openWorldHint: true,
      readOnlyHint: true,
      idempotentHint: true,
      title: "List all the VPCs",
    },
    async (args) => await listVpcs(args)
  );
};
