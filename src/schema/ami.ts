import { DescribeImagesCommandInput } from "@aws-sdk/client-ec2";
import { z } from "zod";
import {
  dryRunSchema,
  filterSchema,
  paginationSchema,
  regionSchema,
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

// Export the schemas
export const listAmisSchema = {
  region: regionSchema,
  AmiArgs: listAmisBaseSchema,
};

// Export the types
export type ListAmisArgs = z.infer<
  ReturnType<typeof z.object<typeof listAmisSchema>>
>;
