import {
  CreateImageCommandInput,
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

// Export the schemas
export const listAmisSchema = {
  region: regionSchema,
  AmiArgs: listAmisBaseSchema,
};

export const createAmiSchema = {
  region: regionSchema,
  AmiArgs: createAmiBaseSchema,
};

// Export the types
export type ListAmisArgs = z.infer<
  ReturnType<typeof z.object<typeof listAmisSchema>>
>;

export type CreateAmiArgs = z.infer<
  ReturnType<typeof z.object<typeof createAmiSchema>>
>;
