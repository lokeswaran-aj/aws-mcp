import { ListBucketsCommandInput } from "@aws-sdk/client-s3";
import { z } from "zod";
import { regionSchema } from "./common";

// Schema for listing buckets
const listBucketsBaseSchema = z.object({
  BucketRegion: z
    .string()
    .optional()
    .describe(
      "Limits the response to buckets that are located in the specified AWS Region"
    ),
  MaxBuckets: z
    .number()
    .optional()
    .describe("The maximum number of buckets to retrieve"),
  ContinuationToken: z
    .string()
    .min(0)
    .max(1024)
    .optional()
    .describe(
      "ContinuationToken indicates to Amazon S3 that the list is being continued on this bucket with a token. Used for pagination of the list results."
    ),
  Prefix: z
    .string()
    .optional()
    .describe(
      "Limits the response to bucket names that begin with the specified bucket name prefix"
    ),
}) satisfies z.ZodType<ListBucketsCommandInput>;

// Export types for the schemas
export type ListBucketsArgs = z.infer<
  ReturnType<typeof z.object<typeof listBucketsSchema>>
>;

// Export schemas
export const listBucketsSchema = {
  region: regionSchema,
  S3Args: listBucketsBaseSchema,
};
