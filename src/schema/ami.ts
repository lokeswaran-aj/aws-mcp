import {
  CreateImageCommandInput,
  DeregisterImageCommandInput,
  DescribeImagesCommandInput,
} from "@aws-sdk/client-ec2";
import { z } from "zod";
import {
  blockDeviceMappingSchema,
  dryRunSchema,
  filterSchema,
  paginationSchema,
  regionSchema,
  tagSpecificationSchema,
} from "./common";

// List AMIs
const listAmisBaseSchema = z.object({
  Owners: z
    .array(z.string())
    .optional()
    .describe("The owners of the AMIs to describe"),
  ExecutableUsers: z
    .array(z.string())
    .optional()
    .describe("The users with launch permission for the AMIs to describe"),
  ImageIds: z
    .array(z.string())
    .optional()
    .describe("The IDs of the AMIs to describe"),
  Filters: filterSchema,
  DryRun: dryRunSchema,
  ...paginationSchema,
}) satisfies z.ZodType<DescribeImagesCommandInput>;

// Create AMI
const createAmiBaseSchema = z.object({
  Name: z.string().describe("The name of the AMI to create"),
  InstanceId: z
    .string()
    .describe("The ID of the instance to create the AMI from"),
  Description: z
    .string()
    .optional()
    .describe("The description of the AMI to create"),
  TagSpecifications: tagSpecificationSchema,
  BlockDeviceMappings: blockDeviceMappingSchema,
  DryRun: dryRunSchema,
}) satisfies z.ZodType<CreateImageCommandInput>;

// Delete AMI
const deleteAmiBaseSchema = z.object({
  ImageId: z.string().describe("The ID of the AMI to delete"),
  DeleteAssociatedSnapshots: z
    .boolean()
    .optional()
    .describe("Whether to delete the associated snapshots"),
  DryRun: dryRunSchema,
}) satisfies z.ZodType<DeregisterImageCommandInput>;

// Export the schemas
export const listAmisSchema = z.object({
  region: regionSchema,
  AmiArgs: listAmisBaseSchema,
});

export const createAmiSchema = z.object({
  region: regionSchema,
  AmiArgs: createAmiBaseSchema,
});

export const deleteAmiSchema = z.object({
  region: regionSchema,
  AmiArgs: deleteAmiBaseSchema,
});

// Export the types
export type ListAmisArgs = z.infer<typeof listAmisSchema>;

export type CreateAmiArgs = z.infer<typeof createAmiSchema>;

export type DeleteAmiArgs = z.infer<typeof deleteAmiSchema>;
