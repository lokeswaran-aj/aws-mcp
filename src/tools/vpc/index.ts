import {
  createVpcSchema,
  deleteVpcSchema,
  listVpcsSchema,
  updateVpcAttributeSchema,
  updateVpcEndpointSchema,
} from "@/schema/vpc";
import { server } from "@/server";
import {
  createVpc,
  deleteVpc,
  listVpcs,
  updateVpcAttribute,
  updateVpcEndpoint,
} from "./handler";

export const registerVpcTools = async (): Promise<void> => {
  server.addTool({
    name: "list-vpcs",
    description: "List all the VPCs in the given region",
    parameters: listVpcsSchema,
    annotations: {
      destructiveHint: false,
      openWorldHint: true,
      readOnlyHint: true,
      idempotentHint: true,
      title: "List all the VPCs",
    },
    execute: async (args) => await listVpcs(args),
  });
  server.addTool({
    name: "create-vpc",
    description: "Create a new VPC in the given region",
    parameters: createVpcSchema,
    annotations: {
      destructiveHint: false,
      openWorldHint: true,
      readOnlyHint: false,
      idempotentHint: true,
      title: "Create a new VPC",
    },
    execute: async (args) => await createVpc(args),
  });
  server.addTool({
    name: "delete-vpc",
    description: "Delete a VPC by VPC ID in the given region",
    parameters: deleteVpcSchema,
    annotations: {
      destructiveHint: true,
      openWorldHint: true,
      readOnlyHint: false,
      idempotentHint: true,
      title: "Delete a VPC",
    },
    execute: async (args) => await deleteVpc(args),
  });
  server.addTool({
    name: "update-vpc-attribute",
    description:
      "Update a VPC attribute(EnableDnsHostnames, EnableDnsSupport, EnableNetworkAddressUsageMetrics) by VPC ID in the given region",
    parameters: updateVpcAttributeSchema,
    annotations: {
      destructiveHint: false,
      openWorldHint: true,
      readOnlyHint: false,
      idempotentHint: true,
      title: "Update a VPC attribute",
    },
    execute: async (args) => await updateVpcAttribute(args),
  });
  server.addTool({
    name: "update-vpc-endpoint",
    description:
      "Update a VPC endpoint(Gateway endpoint, Interface endpoint) by VPC endpoint ID in the given region",
    parameters: updateVpcEndpointSchema,
    annotations: {
      destructiveHint: false,
      openWorldHint: true,
      readOnlyHint: false,
      idempotentHint: true,
      title: "Update a VPC endpoint",
    },
    execute: async (args) => await updateVpcEndpoint(args),
  });
};
