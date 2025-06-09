import { createBucketSchema, listBucketsSchema } from "@/schema/s3";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { createBucket, listAllBuckets } from "./handler";

export const registerS3Tools = async (server: McpServer): Promise<void> => {
  server.tool(
    "s3-list-buckets",
    "List all the S3 buckets in the given region",
    listBucketsSchema,
    {
      destructiveHint: false,
      openWorldHint: true,
      readOnlyHint: true,
      idempotentHint: true,
      title: "List all the S3 buckets",
    },
    async (args) => await listAllBuckets(args)
  );
  server.tool(
    "s3-create-bucket",
    "Create a new S3 bucket in the given region",
    createBucketSchema,
    {
      destructiveHint: false,
      openWorldHint: true,
      readOnlyHint: true,
      idempotentHint: true,
      title: "Create a new S3 bucket",
    },
    async (args) => await createBucket(args)
  );
};
