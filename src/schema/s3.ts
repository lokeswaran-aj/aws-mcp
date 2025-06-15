import {
  BucketLocationConstraint,
  CreateBucketCommandInput,
  DeleteBucketCommandInput,
  ListBucketsCommandInput,
} from "@aws-sdk/client-s3";
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

// Schema for creating a bucket
const createBucketBaseSchema = z.object({
  Bucket: z
    .string()
    .min(3)
    .max(63)
    .regex(
      /^[a-z0-9.-]+$/,
      "Bucket name must contain only lowercase letters, numbers, hyphens, and dots"
    )
    .regex(/^[a-z0-9]/, "Bucket name must start with a letter or number")
    .regex(/[a-z0-9]$/, "Bucket name must end with a letter or number")
    .describe("The name of the bucket to create"),
  CreateBucketConfiguration: z
    .object({
      LocationConstraint: z
        .nativeEnum(BucketLocationConstraint)
        .optional()
        .describe("Specifies the Region where the bucket will be created"),
    })
    .optional()
    .describe("The configuration information for the bucket"),
  ObjectLockEnabledForBucket: z
    .boolean()
    .optional()
    .describe(
      "Specifies whether you want S3 Object Lock to be enabled for the new bucket"
    ),
}) satisfies z.ZodType<CreateBucketCommandInput>;

// Schema for deleting a bucket
const deleteBucketBaseSchema = z.object({
  Bucket: z.string().describe("The name of the bucket to delete"),
}) satisfies z.ZodType<DeleteBucketCommandInput>;

// Export schemas
export const listBucketsSchema = z.object({
  region: regionSchema,
  S3Args: listBucketsBaseSchema,
});

export const createBucketSchema = z.object({
  region: regionSchema,
  S3Args: createBucketBaseSchema,
});

export const deleteBucketSchema = z.object({
  region: regionSchema,
  S3Args: deleteBucketBaseSchema,
});

// Export types for the schemas
export type ListBucketsArgs = z.infer<typeof listBucketsSchema>;

export type CreateBucketArgs = z.infer<typeof createBucketSchema>;

export type DeleteBucketArgs = z.infer<typeof deleteBucketSchema>;
