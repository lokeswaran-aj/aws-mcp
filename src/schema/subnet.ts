import {
  CreateSubnetCommandInput,
  DescribeSubnetsCommandInput,
  HostnameType,
  ModifySubnetAttributeCommandInput,
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

// Update Subnet Attributes
const updateSubnetAttributeBaseSchema = z.object({
  SubnetId: z.string().describe("The ID of the subnet to modify"),
  AssignIpv6AddressOnCreation: z
    .object({
      Value: z.boolean().describe("Whether to enable IPv6 auto-assignment"),
    })
    .optional()
    .describe(
      "Enable automatic IPv6 address assignment for new instances launched in this subnet. Useful for dual-stack or IPv6-only applications"
    ),
  CustomerOwnedIpv4Pool: z
    .string()
    .optional()
    .describe(
      "Customer-owned IP pool ID for AWS Outposts. Required when enabling customer-owned IP assignment on Outpost subnets"
    ),
  DisableLniAtDeviceIndex: z
    .object({
      Value: z
        .boolean()
        .describe("Whether to disable local network interfaces"),
    })
    .optional()
    .describe(
      "Disable local network interfaces at the current device position. Only applicable for AWS Outpost server subnets"
    ),
  EnableDns64: z
    .object({
      Value: z.boolean().describe("Whether to enable DNS64 translation"),
    })
    .optional()
    .describe(
      "Enable DNS64 to allow IPv6-only workloads to communicate with IPv4-only services through NAT64. Requires a NAT gateway in a public subnet"
    ),
  EnableLniAtDeviceIndex: z
    .number()
    .optional()
    .describe(
      "Device position for local network interfaces on AWS Outpost servers (e.g., 1 for eth1). Cannot be 0 (primary interface)"
    ),
  EnableResourceNameDnsAAAARecordOnLaunch: z
    .object({
      Value: z.boolean().describe("Whether to create IPv6 DNS records"),
    })
    .optional()
    .describe(
      "Create DNS AAAA records (IPv6) for instance hostnames. Enable this for IPv6-enabled subnets where you want hostname resolution"
    ),
  EnableResourceNameDnsARecordOnLaunch: z
    .object({
      Value: z.boolean().describe("Whether to create IPv4 DNS records"),
    })
    .optional()
    .describe(
      "Create DNS A records (IPv4) for instance hostnames. Standard setting for most subnets to enable hostname resolution"
    ),
  MapCustomerOwnedIpOnLaunch: z
    .object({
      Value: z.boolean().describe("Whether to assign customer-owned IPs"),
    })
    .optional()
    .describe(
      "Automatically assign customer-owned IPv4 addresses to instances in AWS Outpost subnets. Must specify CustomerOwnedIpv4Pool when enabled"
    ),
  MapPublicIpOnLaunch: z
    .object({
      Value: z.boolean().describe("Whether to assign public IPs automatically"),
    })
    .optional()
    .describe(
      "Automatically assign public IPv4 addresses to instances launched in this subnet. Typically enabled for public subnets, disabled for private subnets"
    ),
  PrivateDnsHostnameTypeOnLaunch: z
    .nativeEnum(HostnameType)
    .optional()
    .describe(
      "Hostname format for instances: 'ip-name' uses IPv4 address (ip-10-0-1-5), 'resource-name' uses instance ID (i-1234567890abcdef0). Use 'resource-name' for IPv6-only subnets"
    ),
}) satisfies z.ZodType<ModifySubnetAttributeCommandInput>;

// Schemas
export const listSubnetsSchema = {
  region: regionSchema,
  SubnetArgs: listSubnetsBaseSchema,
};

export const createSubnetSchema = {
  region: regionSchema,
  SubnetArgs: createSubnetBaseSchema,
};

export const updateSubnetAttributeSchema = {
  region: regionSchema,
  SubnetArgs: updateSubnetAttributeBaseSchema,
};

// Types
export type ListSubnetsArgs = z.infer<
  ReturnType<typeof z.object<typeof listSubnetsSchema>>
>;

export type CreateSubnetArgs = z.infer<
  ReturnType<typeof z.object<typeof createSubnetSchema>>
>;

export type UpdateSubnetAttributeArgs = z.infer<
  ReturnType<typeof z.object<typeof updateSubnetAttributeSchema>>
>;
