import {
  CreateSecurityGroupCommandInput,
  DescribeSecurityGroupRulesCommandInput,
  DescribeSecurityGroupsCommandInput,
} from "@aws-sdk/client-ec2";
import z from "zod";
import {
  dryRunSchema,
  filterSchema,
  paginationSchema,
  regionSchema,
  tagSpecificationSchema,
} from "./common";

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
