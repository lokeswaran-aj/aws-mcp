import { DescribeRouteTablesCommandInput } from "@aws-sdk/client-ec2";
import z from "zod";
import {
  dryRunSchema,
  filterSchema,
  paginationSchema,
  regionSchema,
} from "./common";

// List Route Tables
const listRouteTablesBaseSchema = z.object({
  RouteTableIds: z.array(z.string()).optional(),
  Filters: filterSchema,
  DryRun: dryRunSchema,
  ...paginationSchema,
}) satisfies z.ZodType<DescribeRouteTablesCommandInput>;

// Export the schemas
export const listRouteTablesSchema = {
  region: regionSchema,
  RouteTableArgs: listRouteTablesBaseSchema,
};

// Export the types
export type ListRouteTablesArgs = z.infer<
  ReturnType<typeof z.object<typeof listRouteTablesSchema>>
>;
