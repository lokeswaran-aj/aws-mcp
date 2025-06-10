import {
  DescribeSecurityGroupRulesCommandInput,
  DescribeSecurityGroupsCommandInput,
} from "@aws-sdk/client-ec2";
import z from "zod";
import {
  dryRunSchema,
  filterSchema,
  paginationSchema,
  regionSchema,
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

// Export the schemas
export const listSecurityGroupsSchema = {
  region: regionSchema,
  SecurityGroupArgs: listSecurityGroupsBaseSchema,
};

export const listSecurityGroupRulesSchema = {
  region: regionSchema,
  SecurityGroupRuleArgs: listSecurityGroupRulesBaseSchema,
};

// Export the types
export type ListSecurityGroupsArgs = z.infer<
  ReturnType<typeof z.object<typeof listSecurityGroupsSchema>>
>;

export type ListSecurityGroupRulesArgs = z.infer<
  ReturnType<typeof z.object<typeof listSecurityGroupRulesSchema>>
>;
