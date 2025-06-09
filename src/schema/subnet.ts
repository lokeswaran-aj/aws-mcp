import { DescribeSubnetsCommandInput } from "@aws-sdk/client-ec2";
import { z } from "zod";
import { regionSchema } from "./common";

const listSubnetsBaseSchema = z.object({
  Filters: z
    .array(
      z.object({
        Name: z.string().describe("The name of the filter"),
        Values: z.array(z.string()).describe("The values of the filter"),
      })
    )
    .optional()
    .describe("The filters for the subnet description request"),
  MaxResults: z
    .number()
    .optional()
    .describe("The maximum number of items to return for this request"),
  NextToken: z
    .string()
    .optional()
    .describe("The token returned from a previous paginated request"),
  SubnetIds: z.array(z.string()).optional().describe("The IDs of the subnets"),
}) satisfies z.ZodType<DescribeSubnetsCommandInput>;

export const listSubnetsSchema = {
  region: regionSchema,
  SubnetArgs: listSubnetsBaseSchema,
};

export type ListSubnetsArgs = z.infer<
  ReturnType<typeof z.object<typeof listSubnetsSchema>>
>;
