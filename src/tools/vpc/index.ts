import {
  createVpcSchema,
  deleteVpcSchema,
  listVpcsSchema,
  updateVpcAttributeSchema,
} from "@/schema/vpc";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { createVpc, deleteVpc, listVpcs, updateVpcAttribute } from "./handler";

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
  server.tool(
    "vpc-delete-vpc",
    "Delete a VPC by VPC ID in the given region",
    deleteVpcSchema,
    {
      destructiveHint: true,
      openWorldHint: true,
      readOnlyHint: false,
      idempotentHint: true,
      title: "Delete a VPC",
    },
    async (args) => await deleteVpc(args)
  );
  server.tool(
    "vpc-update-vpc-attribute",
    "Update a VPC attribute(EnableDnsHostnames, EnableDnsSupport, EnableNetworkAddressUsageMetrics) by VPC ID in the given region",
    updateVpcAttributeSchema,
    {
      destructiveHint: false,
      openWorldHint: true,
      readOnlyHint: false,
      idempotentHint: true,
      title: "Update a VPC attribute",
    },
    async (args) => await updateVpcAttribute(args)
  );
};
