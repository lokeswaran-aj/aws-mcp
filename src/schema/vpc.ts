import { DescribeVpcsCommandInput } from "@aws-sdk/client-ec2";
import { z } from "zod";
import { regionSchema } from "./common";

const listVpcsBaseSchema = z.object({
  VpcIds: z.array(z.string()).optional().describe("The IDs of the VPCs"),
  MaxResults: z
    .number()
    .optional()
    .describe("The maximum number of items to return for this request"),
  NextToken: z
    .string()
    .optional()
    .describe("The token returned from a previous paginated request"),
  Filters: z
    .array(
      z.object({
        Name: z.enum([
          "cidr",
          "cidr-block-association.cidr-block",
          "cidr-block-association.association-id",
          "cidr-block-association.state",
          "dhcp-options-id",
          "ipv6-cidr-block-association.ipv6-cidr-block",
          "ipv6-cidr-block-association.ipv6-pool",
          "ipv6-cidr-block-association.association-id",
          "ipv6-cidr-block-association.state",
          "is-default",
          "owner-id",
          "state",
          "tag",
          "tag-key",
          "vpc-id",
        ]),
        Values: z.array(z.string()),
      })
    )
    .optional()
    .describe("The filters for the VPC description request"),
  DryRun: z
    .boolean()
    .optional()
    .describe(
      "Checks whether you have the required permissions for the action, without actually making the request"
    ),
}) satisfies z.ZodType<DescribeVpcsCommandInput>;

export const listVpcsSchema = {
  region: regionSchema,
  VpcArgs: listVpcsBaseSchema,
};

export type ListVpcsArgs = z.infer<
  ReturnType<typeof z.object<typeof listVpcsSchema>>
>;
