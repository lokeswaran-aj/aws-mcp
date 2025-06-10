import {
  CreateInternetGatewayCommandInput,
  DescribeInternetGatewaysCommandInput,
} from "@aws-sdk/client-ec2";
import z from "zod";
import {
  dryRunSchema,
  filterSchema,
  paginationSchema,
  regionSchema,
  tagSpecificationSchema,
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

// Create Internet Gateway
const createInternetGatewayBaseSchema = z.object({
  DryRun: dryRunSchema,
  TagSpecifications: tagSpecificationSchema,
}) satisfies z.ZodType<CreateInternetGatewayCommandInput>;

// Export the schemas
export const listInternetGatewaysSchema = {
  region: regionSchema,
  InternetGatewayArgs: listInternetGatewaysBaseSchema,
};

export const createInternetGatewaySchema = {
  region: regionSchema,
  InternetGatewayArgs: createInternetGatewayBaseSchema,
};

// Export the types
export type ListInternetGatewaysArgs = z.infer<
  ReturnType<typeof z.object<typeof listInternetGatewaysSchema>>
>;

export type CreateInternetGatewayArgs = z.infer<
  ReturnType<typeof z.object<typeof createInternetGatewaySchema>>
>;
