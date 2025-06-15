import {
  createBucketSchema,
  deleteBucketSchema,
  listBucketsSchema,
} from "@/schema/s3";
import { server } from "@/server";
import { createBucket, deleteBucket, listAllBuckets } from "./handler";

export const registerS3Tools = (): void => {
  server.addTool({
    name: "list-buckets",
    description: "List all the S3 buckets in the given region",
    parameters: listBucketsSchema,
    annotations: {
      destructiveHint: false,
      openWorldHint: true,
      readOnlyHint: true,
      idempotentHint: true,
      title: "List all the S3 buckets",
    },
    execute: async (args, context) => await listAllBuckets(args, context),
  });
  server.addTool({
    name: "create-bucket",
    description: "Create a new S3 bucket in the given region",
    parameters: createBucketSchema,
    annotations: {
      destructiveHint: false,
      openWorldHint: true,
      readOnlyHint: false,
      idempotentHint: true,
      title: "Create a new S3 bucket",
    },
    execute: async (args, context) => await createBucket(args, context),
  });
  server.addTool({
    name: "delete-bucket",
    description: "Delete an S3 bucket in the given region",
    parameters: deleteBucketSchema,
    annotations: {
      destructiveHint: true,
      openWorldHint: true,
      readOnlyHint: false,
      idempotentHint: true,
      title: "Delete an S3 bucket",
    },
    execute: async (args, context) => await deleteBucket(args, context),
  });
};
