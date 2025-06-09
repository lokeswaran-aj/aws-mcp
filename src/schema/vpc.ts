import {
  CreateVpcCommandInput,
  DescribeVpcsCommandInput,
  ResourceType,
} from "@aws-sdk/client-ec2";
import { z } from "zod";
import { regionSchema } from "./common";

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
        Name: z.enum([
          "cidr",
          "cidr-block-association.cidr-block",
          "cidr-block-association.association-id",
          "cidr-block-association.state",
          "dhcp-options-id",
          "ipv6-cidr-block-association.ipv6-cidr-block",
          "ipv6-cidr-block-association.ipv6-pool",
          "ipv6-cidr-block-association.association-id",
          "ipv6-cidr-block-association.state",
          "is-default",
          "owner-id",
          "state",
          "tag",
          "tag-key",
          "vpc-id",
        ]),
        Values: z.array(z.string()),
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

export const listVpcsSchema = {
  region: regionSchema,
  VpcArgs: listVpcsBaseSchema,
};

export type ListVpcsArgs = z.infer<
  ReturnType<typeof z.object<typeof listVpcsSchema>>
>;

export const createVpcSchema = {
  region: regionSchema,
  VpcArgs: createVpcBaseSchema,
};

export type CreateVpcArgs = z.infer<
  ReturnType<typeof z.object<typeof createVpcSchema>>
>;
