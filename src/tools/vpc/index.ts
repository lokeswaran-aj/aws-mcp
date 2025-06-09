import { createVpcSchema, listVpcsSchema } from "@/schema/vpc";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { createVpc, listVpcs } from "./handler";

export const registerVpcTools = async (server: McpServer): Promise<void> => {
  server.tool(
    "vpc-list-vpcs",
    "List all the VPCs in the given region",
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
  server.tool(
    "vpc-create-vpc",
    "Create a new VPC in the given region",
    createVpcSchema,
    {
      destructiveHint: false,
      openWorldHint: true,
      readOnlyHint: false,
      idempotentHint: true,
      title: "Create a new VPC",
    },
    async (args) => await createVpc(args)
  );
};
