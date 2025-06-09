import {
  CreateSubnetCommandInput,
  DescribeSubnetsCommandInput,
  ResourceType,
} from "@aws-sdk/client-ec2";
import { z } from "zod";
import { regionSchema } from "./common";

// List Subnets
const listSubnetsBaseSchema = z.object({
  Filters: z
    .array(
      z.object({
        Name: z.string().describe("The name of the filter"),
        Values: z.array(z.string()).describe("The values of the filter"),
      })
    )
    .optional()
    .describe("The filters for the subnet description request"),
  MaxResults: z
    .number()
    .optional()
    .describe("The maximum number of items to return for this request"),
  NextToken: z
    .string()
    .optional()
    .describe("The token returned from a previous paginated request"),
  SubnetIds: z.array(z.string()).optional().describe("The IDs of the subnets"),
}) satisfies z.ZodType<DescribeSubnetsCommandInput>;

// Create Subnet
const createSubnetBaseSchema = z.object({
  TagSpecifications: z
    .array(
      z.object({
        ResourceType: z.nativeEnum(ResourceType).optional(),
        Tags: z
          .array(
            z.object({
              Key: z.string().optional(),
              Value: z.string().optional(),
            })
          )
          .optional(),
      })
    )
    .optional()
    .describe("The tags to assign to the subnet"),
  AvailabilityZone: z
    .string()
    .optional()
    .describe("The Availability Zone or Local Zone for the subnet"),
  AvailabilityZoneId: z
    .string()
    .optional()
    .describe("The AZ ID or the Local Zone ID of the subnet"),
  CidrBlock: z
    .string()
    .optional()
    .describe("The IPv4 network range for the subnet, in CIDR notation"),
  Ipv6CidrBlock: z
    .string()
    .optional()
    .describe("The IPv6 network range for the subnet, in CIDR notation"),
  OutpostArn: z
    .string()
    .optional()
    .describe("The Amazon Resource Name (ARN) of the Outpost"),
  VpcId: z.string().describe("The ID of the VPC"),
  Ipv6Native: z
    .boolean()
    .optional()
    .describe("Indicates whether to create an IPv6 only subnet"),
  Ipv4IpamPoolId: z
    .string()
    .optional()
    .describe("An IPv4 IPAM pool ID for the subnet"),
  Ipv4NetmaskLength: z
    .number()
    .optional()
    .describe("An IPv4 netmask length for the subnet"),
  Ipv6IpamPoolId: z
    .string()
    .optional()
    .describe("An IPv6 IPAM pool ID for the subnet"),
  Ipv6NetmaskLength: z
    .number()
    .optional()
    .describe("An IPv6 netmask length for the subnet"),
  DryRun: z
    .boolean()
    .optional()
    .describe(
      "Checks whether you have the required permissions for the action"
    ),
}) satisfies z.ZodType<CreateSubnetCommandInput>;

// Schemas
export const listSubnetsSchema = {
  region: regionSchema,
  SubnetArgs: listSubnetsBaseSchema,
};

export const createSubnetSchema = {
  region: regionSchema,
  SubnetArgs: createSubnetBaseSchema,
};

// Types
export type ListSubnetsArgs = z.infer<
  ReturnType<typeof z.object<typeof listSubnetsSchema>>
>;

export type CreateSubnetArgs = z.infer<
  ReturnType<typeof z.object<typeof createSubnetSchema>>
>;
