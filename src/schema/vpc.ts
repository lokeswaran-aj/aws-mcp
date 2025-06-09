import {
  CreateVpcCommandInput,
  DeleteVpcCommandInput,
  DescribeVpcsCommandInput,
  DnsRecordIpType,
  IpAddressType,
  ModifyVpcAttributeCommandInput,
  ModifyVpcEndpointCommandInput,
  ResourceType,
} from "@aws-sdk/client-ec2";
import { z } from "zod";
import { regionSchema } from "./common";

// List VPCs
const listVpcsBaseSchema = z.object({
  VpcIds: z.array(z.string()).optional().describe("The IDs of the VPCs"),
  MaxResults: z
    .number()
    .optional()
    .describe("The maximum number of items to return for this request"),
  NextToken: z
    .string()
    .optional()
    .describe("The token returned from a previous paginated request"),
  Filters: z
    .array(
      z.object({
        Name: z.string().describe("The name of the filter"),
        Values: z.array(z.string()).describe("The values of the filter"),
      })
    )
    .optional()
    .describe("The filters for the VPC description request"),
  DryRun: z
    .boolean()
    .optional()
    .describe(
      "Checks whether you have the required permissions for the action, without actually making the request"
    ),
}) satisfies z.ZodType<DescribeVpcsCommandInput>;

// Create VPC
const createVpcBaseSchema = z.object({
  CidrBlock: z
    .string()
    .optional()
    .describe(
      "The IPv4 network range for the VPC, in CIDR notation. For example, 10.0.0.0/16"
    ),
  InstanceTenancy: z
    .enum(["default", "dedicated", "host"])
    .default("default")
    .describe("The tenancy options for instances launched into the VPC"),
  AmazonProvidedIpv6CidrBlock: z
    .boolean()
    .optional()
    .describe(
      "Requests an Amazon-provided IPv6 CIDR block with a /56 prefix length for the VPC"
    ),
  Ipv6Pool: z
    .string()
    .optional()
    .describe(
      "The ID of an IPv6 address pool from which to allocate the IPv6 CIDR block"
    ),
  Ipv6CidrBlock: z
    .string()
    .optional()
    .describe(
      "The IPv6 CIDR block from the IPv6 address pool. You must also specify Ipv6Pool"
    ),
  Ipv6CidrBlockNetworkBorderGroup: z
    .string()
    .optional()
    .describe(
      "The name of the location from which we advertise the IPV6 CIDR block"
    ),
  Ipv4IpamPoolId: z
    .string()
    .optional()
    .describe(
      "The ID of an IPv4 IPAM pool you want to use for allocating this VPC's CIDR"
    ),
  Ipv4NetmaskLength: z
    .number()
    .int()
    .optional()
    .describe("The netmask length of the IPv4 CIDR from an IPAM pool"),
  Ipv6IpamPoolId: z
    .string()
    .optional()
    .describe(
      "The ID of an IPv6 IPAM pool which will be used to allocate this VPC an IPv6 CIDR"
    ),
  Ipv6NetmaskLength: z
    .number()
    .int()
    .optional()
    .describe("The netmask length of the IPv6 CIDR from an IPAM pool"),
  TagSpecifications: z
    .array(
      z.object({
        ResourceType: z
          .nativeEnum(ResourceType)
          .optional()
          .describe("The type of resource to tag"),
        Tags: z
          .array(
            z.object({
              Key: z.string().max(127).describe("The key of the tag"),
              Value: z.string().max(256).describe("The value of the tag"),
            })
          )
          .optional()
          .describe("The tags to apply to the resource"),
      })
    )
    .optional()
    .describe("The tags to assign to the VPC"),
  DryRun: z
    .boolean()
    .optional()
    .describe(
      "Checks whether you have the required permissions for the action, without actually making the request"
    ),
}) satisfies z.ZodType<CreateVpcCommandInput>;

// Delete VPC
const deleteVpcBaseSchema = z.object({
  VpcId: z.string().describe("The ID of the VPC to delete"),
  DryRun: z
    .boolean()
    .optional()
    .describe(
      "Checks whether you have the required permissions for the action, without actually making the request"
    ),
}) satisfies z.ZodType<DeleteVpcCommandInput>;

// Update VPC Attribute
const updateVpcAttributeBaseSchema = z.object({
  VpcId: z.string().describe("The ID of the VPC to update"),
  EnableDnsHostnames: z
    .object({
      Value: z.boolean().describe("The value for the attribute"),
    })
    .optional()
    .describe("Indicates whether DNS hostnames are enabled for the VPC"),
  EnableDnsSupport: z
    .object({
      Value: z.boolean().describe("The value for the attribute"),
    })
    .optional()
    .describe("Indicates whether DNS support is enabled for the VPC"),
  EnableNetworkAddressUsageMetrics: z
    .object({
      Value: z.boolean().describe("The value for the attribute"),
    })
    .optional()
    .describe(
      "Indicates whether Network Address Usage metrics are enabled for your VPC"
    ),
}) satisfies z.ZodType<ModifyVpcAttributeCommandInput>;

// Update VPC Endpoint
const updateVpcEndpointBaseSchema = z.object({
  VpcEndpointId: z.string().describe("The ID of the VPC endpoint to update"),
  DryRun: z
    .boolean()
    .optional()
    .describe(
      "Checks whether you have the required permissions for the action, without actually making the request"
    ),
  ResetPolicy: z
    .boolean()
    .optional()
    .describe(
      "(Gateway endpoint) Specify true to reset the policy document to the default policy"
    ),
  PolicyDocument: z
    .string()
    .optional()
    .describe(
      "(Interface and gateway endpoints) A policy to attach to the endpoint that controls access to the service"
    ),
  AddRouteTableIds: z
    .array(z.string())
    .optional()
    .describe(
      "(Gateway endpoint) The IDs of the route tables to associate with the endpoint"
    ),
  RemoveRouteTableIds: z
    .array(z.string())
    .optional()
    .describe(
      "(Gateway endpoint) The IDs of the route tables to disassociate from the endpoint"
    ),
  AddSubnetIds: z
    .array(z.string())
    .optional()
    .describe(
      "(Interface and Gateway Load Balancer endpoints) The IDs of the subnets in which to serve the endpoint"
    ),
  RemoveSubnetIds: z
    .array(z.string())
    .optional()
    .describe(
      "(Interface endpoint) The IDs of the subnets from which to remove the endpoint"
    ),
  AddSecurityGroupIds: z
    .array(z.string())
    .optional()
    .describe(
      "(Interface endpoint) The IDs of the security groups to associate with the endpoint network interfaces"
    ),
  RemoveSecurityGroupIds: z
    .array(z.string())
    .optional()
    .describe(
      "(Interface endpoint) The IDs of the security groups to disassociate from the endpoint network interfaces"
    ),
  IpAddressType: z
    .nativeEnum(IpAddressType)
    .optional()
    .describe("The IP address type for the endpoint"),
  DnsOptions: z
    .object({
      DnsRecordIpType: z
        .nativeEnum(DnsRecordIpType)
        .optional()
        .describe("The DNS record IP type for the endpoint"),
      PrivateDnsOnlyForInboundResolverEndpoint: z
        .boolean()
        .optional()
        .describe(
          "Indicates whether to enable private DNS only for inbound endpoints"
        ),
    })
    .optional()
    .describe("The DNS options for the endpoint"),
  PrivateDnsEnabled: z
    .boolean()
    .optional()
    .describe(
      "(Interface endpoint) Indicates whether a private hosted zone is associated with the VPC"
    ),
  SubnetConfigurations: z
    .array(
      z.object({
        SubnetId: z.string().optional().describe("The ID of the subnet"),
        Ipv4: z
          .string()
          .optional()
          .describe("The IPv4 address to assign to the endpoint"),
        Ipv6: z
          .string()
          .optional()
          .describe("The IPv6 address to assign to the endpoint"),
      })
    )
    .optional()
    .describe("The subnet configurations for the endpoint"),
}) satisfies z.ZodType<ModifyVpcEndpointCommandInput>;
// Schemas
export const listVpcsSchema = {
  region: regionSchema,
  VpcArgs: listVpcsBaseSchema,
};

export const createVpcSchema = {
  region: regionSchema,
  VpcArgs: createVpcBaseSchema,
};

export const deleteVpcSchema = {
  region: regionSchema,
  VpcArgs: deleteVpcBaseSchema,
};

export const updateVpcAttributeSchema = {
  region: regionSchema,
  VpcArgs: updateVpcAttributeBaseSchema,
};

export const updateVpcEndpointSchema = {
  region: regionSchema,
  VpcArgs: updateVpcEndpointBaseSchema,
};

// Types
export type ListVpcsArgs = z.infer<
  ReturnType<typeof z.object<typeof listVpcsSchema>>
>;

export type CreateVpcArgs = z.infer<
  ReturnType<typeof z.object<typeof createVpcSchema>>
>;

export type DeleteVpcArgs = z.infer<
  ReturnType<typeof z.object<typeof deleteVpcSchema>>
>;

export type UpdateVpcAttributeArgs = z.infer<
  ReturnType<typeof z.object<typeof updateVpcAttributeSchema>>
>;

export type UpdateVpcEndpointArgs = z.infer<
  ReturnType<typeof z.object<typeof updateVpcEndpointSchema>>
>;
