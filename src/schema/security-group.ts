import { DescribeSecurityGroupsCommandInput } from "@aws-sdk/client-ec2";
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

// Export the schemas
export const listSecurityGroupsSchema = {
  region: regionSchema,
  SecurityGroupArgs: listSecurityGroupsBaseSchema,
};

// Export the types
export type ListSecurityGroupsArgs = z.infer<
  ReturnType<typeof z.object<typeof listSecurityGroupsSchema>>
>;
