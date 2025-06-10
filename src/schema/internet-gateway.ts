import { DescribeInternetGatewaysCommandInput } from "@aws-sdk/client-ec2";
import z from "zod";
import {
  dryRunSchema,
  filterSchema,
  paginationSchema,
  regionSchema,
} from "./common";

// List Internet Gateways
const listInternetGatewaysBaseSchema = z.object({
  InternetGatewayIds: z
    .array(z.string())
    .optional()
    .describe("The IDs of the internet gateways"),
  Filters: filterSchema,
  DryRun: dryRunSchema,
  ...paginationSchema,
}) satisfies z.ZodType<DescribeInternetGatewaysCommandInput>;

// Export the schemas
export const listInternetGatewaysSchema = {
  region: regionSchema,
  InternetGatewayArgs: listInternetGatewaysBaseSchema,
};

// Export the types
export type ListInternetGatewaysArgs = z.infer<
  ReturnType<typeof z.object<typeof listInternetGatewaysSchema>>
>;
