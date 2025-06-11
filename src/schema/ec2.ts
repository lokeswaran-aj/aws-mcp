import { DescribeInstancesCommandInput } from "@aws-sdk/client-ec2";
import { z } from "zod";
import {
  dryRunSchema,
  filterSchema,
  paginationSchema,
  regionSchema,
} from "./common";

// List EC2 instances
const listEc2InstancesBaseSchema = z.object({
  Filters: filterSchema,
  DryRun: dryRunSchema,
  ...paginationSchema,
  InstanceIds: z
    .array(z.string())
    .optional()
    .describe("The IDs of the instances"),
}) satisfies z.ZodType<DescribeInstancesCommandInput>;

// Export the schemas
export const listEc2InstancesSchema = {
  region: regionSchema,
  Ec2Args: listEc2InstancesBaseSchema,
};

// Export the types
export type ListEc2InstancesArgs = z.infer<
  ReturnType<typeof z.object<typeof listEc2InstancesSchema>>
>;
