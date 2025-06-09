import { RDSClient, RDSClientConfig } from "@aws-sdk/client-rds";
import { S3Client, S3ClientConfig } from "@aws-sdk/client-s3";
import { appConfig } from "./config/app";

const { accessKeyId, secretAccessKey, sessionToken } = appConfig.awsCredentials;

export const getRdsClient = (config: RDSClientConfig): RDSClient =>
  new RDSClient({
    ...config,
    credentials: {
      accessKeyId: accessKeyId,
      secretAccessKey: secretAccessKey,
      sessionToken: sessionToken,
    },
  });

export const getS3Client = (config: S3ClientConfig): S3Client =>
  new S3Client({
    ...config,
    credentials: {
      accessKeyId: accessKeyId,
      secretAccessKey: secretAccessKey,
      sessionToken: sessionToken,
    },
  });
