import {
  AssociateRouteTableCommandInput,
  CreateRouteTableCommandInput,
  DescribeRouteTablesCommandInput,
  DisassociateRouteTableCommandInput,
  ReplaceRouteTableAssociationCommandInput,
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

// Associate Route Table
const associateRouteTableBaseSchema = z.object({
  RouteTableId: z.string().describe("The ID of the route table"),
  GatewayId: z
    .string()
    .describe("The ID of the internet gateway or virtual private gateway")
    .optional(),
  SubnetId: z.string().describe("The ID of the subnet").optional(),
  DryRun: dryRunSchema,
}) satisfies z.ZodType<AssociateRouteTableCommandInput>;

// Disassociate Route Table
const disassociateRouteTableBaseSchema = z.object({
  AssociationId: z.string().describe("The ID of the association"),
  DryRun: dryRunSchema,
}) satisfies z.ZodType<DisassociateRouteTableCommandInput>;

// Replace Route Table Association
const replaceRouteTableAssociationBaseSchema = z.object({
  AssociationId: z.string().describe("The ID of the association"),
  RouteTableId: z.string().describe("The ID of the route table"),
  DryRun: dryRunSchema,
}) satisfies z.ZodType<ReplaceRouteTableAssociationCommandInput>;

// Export the schemas
export const listRouteTablesSchema = {
  region: regionSchema,
  RouteTableArgs: listRouteTablesBaseSchema,
};

export const createRouteTableSchema = {
  region: regionSchema,
  RouteTableArgs: createRouteTableBaseSchema,
};

export const associateRouteTableSchema = {
  region: regionSchema,
  RouteTableArgs: associateRouteTableBaseSchema,
};

export const disassociateRouteTableSchema = {
  region: regionSchema,
  RouteTableArgs: disassociateRouteTableBaseSchema,
};

export const replaceRouteTableAssociationSchema = {
  region: regionSchema,
  RouteTableArgs: replaceRouteTableAssociationBaseSchema,
};

// Export the types
export type ListRouteTablesArgs = z.infer<
  ReturnType<typeof z.object<typeof listRouteTablesSchema>>
>;

export type CreateRouteTablesArgs = z.infer<
  ReturnType<typeof z.object<typeof createRouteTableSchema>>
>;

export type AssociateRouteTableArgs = z.infer<
  ReturnType<typeof z.object<typeof associateRouteTableSchema>>
>;

export type DisassociateRouteTableArgs = z.infer<
  ReturnType<typeof z.object<typeof disassociateRouteTableSchema>>
>;

export type ReplaceRouteTableAssociationArgs = z.infer<
  ReturnType<typeof z.object<typeof replaceRouteTableAssociationSchema>>
>;
