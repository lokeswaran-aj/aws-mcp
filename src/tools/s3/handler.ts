import { getS3Client } from "@/aws-clients";
import { ListBucketsArgs } from "@/schema/s3";
import { HandlerReturnType } from "@/types/common";
import { formatResponse } from "@/utils/format-response";
import { ListBucketsCommand } from "@aws-sdk/client-s3";

export const listAllBuckets = async (
  input: ListBucketsArgs
): Promise<HandlerReturnType> => {
  const s3Client = getS3Client({ region: input.region });
  const command = new ListBucketsCommand(input.S3Args);
  const response = await s3Client.send(command);
  return formatResponse(response);
};
