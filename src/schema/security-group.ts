import {
  AuthorizeSecurityGroupEgressCommandInput,
  AuthorizeSecurityGroupIngressCommandInput,
  CreateSecurityGroupCommandInput,
  DescribeSecurityGroupRulesCommandInput,
  DescribeSecurityGroupsCommandInput,
  IpPermission,
} from "@aws-sdk/client-ec2";
import z from "zod";
import {
  dryRunSchema,
  filterSchema,
  paginationSchema,
  regionSchema,
  tagSpecificationSchema,
} from "./common";

const ipRangeSchema = z.object({
  CidrIp: z.string().describe("The IPv4 CIDR range"),
  Description: z.string().optional().describe("A description for the IP range"),
});

const ipv6RangeSchema = z.object({
  CidrIpv6: z.string().describe("The IPv6 CIDR range"),
  Description: z
    .string()
    .optional()
    .describe("A description for the IPv6 range"),
});

const userIdGroupPairSchema = z.object({
  Description: z
    .string()
    .optional()
    .describe("A description for the security group rule"),
  GroupId: z.string().optional().describe("The ID of the security group"),
  GroupName: z.string().optional().describe("The name of the security group"),
  UserId: z.string().optional().describe("The ID of the AWS account"),
  VpcId: z.string().optional().describe("The ID of the VPC"),
  VpcPeeringConnectionId: z
    .string()
    .optional()
    .describe("The ID of the VPC peering connection"),
  PeeringStatus: z
    .string()
    .optional()
    .describe("The status of the VPC peering connection"),
});

const ipPermissionSchema = z.object({
  FromPort: z
    .number()
    .optional()
    .describe("The start of port range for the TCP and UDP protocols"),
  IpProtocol: z.string().optional().describe("The IP protocol name or number"),
  IpRanges: z.array(ipRangeSchema).optional().describe("IPv4 CIDR ranges"),
  Ipv6Ranges: z.array(ipv6RangeSchema).optional().describe("IPv6 CIDR ranges"),
  PrefixListIds: z
    .array(
      z.object({
        Description: z
          .string()
          .optional()
          .describe("A description for the prefix list ID"),
        PrefixListId: z.string().describe("The ID of the prefix list"),
      })
    )
    .optional()
    .describe("Prefix list IDs for an AWS service"),
  ToPort: z
    .number()
    .optional()
    .describe("The end of port range for the TCP and UDP protocols"),
  UserIdGroupPairs: z
    .array(userIdGroupPairSchema)
    .optional()
    .describe("Security group and AWS account ID pairs"),
}) satisfies z.ZodType<IpPermission>;

// Common Security Group Rule Schema
const commonSecurityGroupRuleSchema = {
  CidrIp: z.string().optional().describe("The CIDR IPv4 address range"),
  FromPort: z
    .number()
    .optional()
    .describe("The start of port range for the TCP and UDP protocols"),
  GroupName: z.string().optional().describe("The name of the security group"),
  IpPermissions: z
    .array(ipPermissionSchema)
    .optional()
    .describe("Sets of IP permissions"),
  IpProtocol: z.string().optional().describe("The IP protocol name or number"),
  ToPort: z
    .number()
    .optional()
    .describe("The end of port range for the TCP and UDP protocols"),
  TagSpecifications: tagSpecificationSchema,
  DryRun: dryRunSchema,
};

// List Security Groups
const listSecurityGroupsBaseSchema = z.object({
  GroupIds: z
    .array(z.string())
    .optional()
    .describe("The IDs of the security groups"),
  GroupNames: z
    .array(z.string())
    .optional()
    .describe("The names of the security groups"),
  Filters: filterSchema,
  DryRun: dryRunSchema,
  ...paginationSchema,
}) satisfies z.ZodType<DescribeSecurityGroupsCommandInput>;

// List Security Groups Rules
const listSecurityGroupRulesBaseSchema = z.object({
  SecurityGroupRuleIds: z
    .array(z.string())
    .optional()
    .describe("The IDs of the security group rules"),
  DryRun: dryRunSchema,
  Filters: filterSchema,
  GroupId: z.string().describe("The ID of the security group"),
  ...paginationSchema,
}) satisfies z.ZodType<DescribeSecurityGroupRulesCommandInput>;

// Create Security Group
const createSecurityGroupBaseSchema = z.object({
  Description: z.string().describe("A description of the security group"),
  GroupName: z.string().describe("The name of the security group"),
  TagSpecifications: tagSpecificationSchema,
  VpcId: z.string().describe("The ID of the VPC"),
  DryRun: dryRunSchema,
}) satisfies z.ZodType<CreateSecurityGroupCommandInput>;

// Authorize Security Group Ingress
const authorizeSecurityGroupIngressBaseSchema = z.object({
  ...commonSecurityGroupRuleSchema,
  GroupId: z.string().optional().describe("The ID of the security group"),
  SourceSecurityGroupName: z
    .string()
    .optional()
    .describe("The name of the source security group"),
  SourceSecurityGroupOwnerId: z
    .string()
    .optional()
    .describe("The AWS account ID for the source security group"),
}) satisfies z.ZodType<AuthorizeSecurityGroupIngressCommandInput>;

// Authorize Security Group Egress
const authorizeSecurityGroupEgressBaseSchema = z.object({
  ...commonSecurityGroupRuleSchema,
  GroupId: z.string().describe("The ID of the security group"),
  DestinationSecurityGroupId: z
    .string()
    .optional()
    .describe("The ID of the destination security group"),
}) satisfies z.ZodType<AuthorizeSecurityGroupEgressCommandInput>;

// Export the schemas
export const listSecurityGroupsSchema = {
  region: regionSchema,
  SecurityGroupArgs: listSecurityGroupsBaseSchema,
};

export const listSecurityGroupRulesSchema = {
  region: regionSchema,
  SecurityGroupRuleArgs: listSecurityGroupRulesBaseSchema,
};

export const createSecurityGroupSchema = {
  region: regionSchema,
  SecurityGroupArgs: createSecurityGroupBaseSchema,
};

export const authorizeSecurityGroupIngressSchema = {
  region: regionSchema,
  SecurityGroupArgs: authorizeSecurityGroupIngressBaseSchema,
};

export const authorizeSecurityGroupEgressSchema = {
  region: regionSchema,
  SecurityGroupArgs: authorizeSecurityGroupEgressBaseSchema,
};

// Export the types
export type ListSecurityGroupsArgs = z.infer<
  ReturnType<typeof z.object<typeof listSecurityGroupsSchema>>
>;

export type ListSecurityGroupRulesArgs = z.infer<
  ReturnType<typeof z.object<typeof listSecurityGroupRulesSchema>>
>;

export type CreateSecurityGroupArgs = z.infer<
  ReturnType<typeof z.object<typeof createSecurityGroupSchema>>
>;

export type AuthorizeSecurityGroupIngressArgs = z.infer<
  ReturnType<typeof z.object<typeof authorizeSecurityGroupIngressSchema>>
>;

export type AuthorizeSecurityGroupEgressArgs = z.infer<
  ReturnType<typeof z.object<typeof authorizeSecurityGroupEgressSchema>>
>;
