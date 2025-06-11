import {
  CreateTagsCommandInput,
  DeleteTagsCommandInput,
  DescribeTagsCommandInput,
} from "@aws-sdk/client-ec2";
import z from "zod";
import {
  dryRunSchema,
  filterSchema,
  paginationSchema,
  regionSchema,
} from "./common";

const tagSchema = z.object({
  Key: z.string().describe("The key of the tag"),
  Value: z.string().describe("The value of the tag"),
});

// List instance tags
const listInstanceTagsBaseSchema = z.object({
  Filters: filterSchema,
  DryRun: dryRunSchema,
  ...paginationSchema,
}) satisfies z.ZodType<DescribeTagsCommandInput>;

// Create instance tag
const createInstanceTagBaseSchema = z.object({
  Resources: z.array(z.string()).describe("The resources to create a tag for"),
  Tags: z.array(tagSchema).describe("The tags to create"),
}) satisfies z.ZodType<CreateTagsCommandInput>;

// Delete instance tag
const deleteInstanceTagBaseSchema = z.object({
  Resources: z.array(z.string()).describe("The resources to delete a tag for"),
  Tags: z.array(tagSchema).describe("The tags to delete"),
  DryRun: dryRunSchema,
}) satisfies z.ZodType<DeleteTagsCommandInput>;

// Export the schemas
export const listInstanceTagsSchema = {
  region: regionSchema,
  InstanceArgs: listInstanceTagsBaseSchema,
};

export const createInstanceTagSchema = {
  region: regionSchema,
  InstanceArgs: createInstanceTagBaseSchema,
};

export const deleteInstanceTagSchema = {
  region: regionSchema,
  InstanceArgs: deleteInstanceTagBaseSchema,
};

// Export the types
export type ListInstanceTagsArgs = z.infer<
  ReturnType<typeof z.object<typeof listInstanceTagsSchema>>
>;

export type CreateInstanceTagArgs = z.infer<
  ReturnType<typeof z.object<typeof createInstanceTagSchema>>
>;

export type DeleteInstanceTagArgs = z.infer<
  ReturnType<typeof z.object<typeof deleteInstanceTagSchema>>
>;
