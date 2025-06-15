import { getS3Client } from "@/aws-clients";
import {
  CreateBucketArgs,
  DeleteBucketArgs,
  ListBucketsArgs,
} from "@/schema/s3";
import { SessionData } from "@/server";
import { HandlerReturnType } from "@/types/common";
import { formatResponse } from "@/utils/format-response";
import {
  CreateBucketCommand,
  DeleteBucketCommand,
  ListBucketsCommand,
} from "@aws-sdk/client-s3";
import { Context } from "fastmcp";

export const listAllBuckets = async (
  args: ListBucketsArgs,
  context: Context<SessionData>
): Promise<HandlerReturnType> => {
  const s3Client = getS3Client({
    region: args.region,
    credentials: context.session?.credentials,
  });
  const command = new ListBucketsCommand(args.S3Args);
  const response = await s3Client.send(command);
  return formatResponse(response);
};

export const createBucket = async (
  args: CreateBucketArgs,
  context: Context<SessionData>
): Promise<HandlerReturnType> => {
  const s3Client = getS3Client({
    region: args.region,
    credentials: context.session?.credentials,
  });
  const command = new CreateBucketCommand(args.S3Args);
  const response = await s3Client.send(command);
  return formatResponse(response);
};

export const deleteBucket = async (
  args: DeleteBucketArgs,
  context: Context<SessionData>
): Promise<HandlerReturnType> => {
  const s3Client = getS3Client({
    region: args.region,
    credentials: context.session?.credentials,
  });
  const command = new DeleteBucketCommand(args.S3Args);
  const response = await s3Client.send(command);
  return formatResponse(response);
};
