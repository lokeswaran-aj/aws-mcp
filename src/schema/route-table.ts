import {
  CreateRouteTableCommandInput,
  DescribeRouteTablesCommandInput,
} from "@aws-sdk/client-ec2";
import z from "zod";
import {
  dryRunSchema,
  filterSchema,
  paginationSchema,
  regionSchema,
  tagSpecificationSchema,
} from "./common";

// List Route Tables
const listRouteTablesBaseSchema = z.object({
  RouteTableIds: z.array(z.string()).optional(),
  Filters: filterSchema,
  DryRun: dryRunSchema,
  ...paginationSchema,
}) satisfies z.ZodType<DescribeRouteTablesCommandInput>;

// Create Route Table
const createRouteTableBaseSchema = z.object({
  VpcId: z.string().describe("The ID of the VPC"),
  TagSpecifications: tagSpecificationSchema,
  DryRun: dryRunSchema,
  ClientToken: z
    .string()
    .uuid()
    .optional()
    .describe(
      "Unique, case-sensitive identifier that you provide to ensure the idempotency of the request"
    ),
}) satisfies z.ZodType<CreateRouteTableCommandInput>;

// Export the schemas
export const listRouteTablesSchema = {
  region: regionSchema,
  RouteTableArgs: listRouteTablesBaseSchema,
};

export const createRouteTableSchema = {
  region: regionSchema,
  RouteTableArgs: createRouteTableBaseSchema,
};

// Export the types
export type ListRouteTablesArgs = z.infer<
  ReturnType<typeof z.object<typeof listRouteTablesSchema>>
>;

export type CreateRouteTablesArgs = z.infer<
  ReturnType<typeof z.object<typeof createRouteTableSchema>>
>;
