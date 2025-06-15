import {
  AssociateRouteTableCommandInput,
  CreateRouteTableCommandInput,
  DeleteRouteTableCommandInput,
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

// Delete Route Table
const deleteRouteTableBaseSchema = z.object({
  RouteTableId: z.string().describe("The ID of the route table"),
  DryRun: dryRunSchema,
}) satisfies z.ZodType<DeleteRouteTableCommandInput>;

// Export the schemas
export const listRouteTablesSchema = z.object({
  region: regionSchema,
  RouteTableArgs: listRouteTablesBaseSchema,
});

export const createRouteTableSchema = z.object({
  region: regionSchema,
  RouteTableArgs: createRouteTableBaseSchema,
});

export const associateRouteTableSchema = z.object({
  region: regionSchema,
  RouteTableArgs: associateRouteTableBaseSchema,
});

export const disassociateRouteTableSchema = z.object({
  region: regionSchema,
  RouteTableArgs: disassociateRouteTableBaseSchema,
});

export const replaceRouteTableAssociationSchema = z.object({
  region: regionSchema,
  RouteTableArgs: replaceRouteTableAssociationBaseSchema,
});

export const deleteRouteTableSchema = z.object({
  region: regionSchema,
  RouteTableArgs: deleteRouteTableBaseSchema,
});

// Export the types
export type ListRouteTablesArgs = z.infer<typeof listRouteTablesSchema>;

export type CreateRouteTableArgs = z.infer<typeof createRouteTableSchema>;

export type AssociateRouteTableArgs = z.infer<typeof associateRouteTableSchema>;

export type DisassociateRouteTableArgs = z.infer<
  typeof disassociateRouteTableSchema
>;

export type ReplaceRouteTableAssociationArgs = z.infer<
  typeof replaceRouteTableAssociationSchema
>;

export type DeleteRouteTableArgs = z.infer<typeof deleteRouteTableSchema>;
