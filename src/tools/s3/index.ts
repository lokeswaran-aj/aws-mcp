import { listBucketsSchema } from "@/schema/s3";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { listAllBuckets } from "./handler";

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
};
