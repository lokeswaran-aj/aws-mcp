import {
  CreateInternetGatewayCommandInput,
  DeleteInternetGatewayCommandInput,
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

// Delete Internet Gateway
const deleteInternetGatewayBaseSchema = z.object({
  InternetGatewayId: z.string().describe("The ID of the internet gateway"),
  DryRun: dryRunSchema,
}) satisfies z.ZodType<DeleteInternetGatewayCommandInput>;

// Export the schemas
export const listInternetGatewaysSchema = {
  region: regionSchema,
  InternetGatewayArgs: listInternetGatewaysBaseSchema,
};

export const createInternetGatewaySchema = {
  region: regionSchema,
  InternetGatewayArgs: createInternetGatewayBaseSchema,
};

export const deleteInternetGatewaySchema = {
  region: regionSchema,
  InternetGatewayArgs: deleteInternetGatewayBaseSchema,
};

// Export the types
export type ListInternetGatewaysArgs = z.infer<
  ReturnType<typeof z.object<typeof listInternetGatewaysSchema>>
>;

export type CreateInternetGatewayArgs = z.infer<
  ReturnType<typeof z.object<typeof createInternetGatewaySchema>>
>;

export type DeleteInternetGatewayArgs = z.infer<
  ReturnType<typeof z.object<typeof deleteInternetGatewaySchema>>
>;
