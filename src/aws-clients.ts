import { EC2Client, EC2ClientConfig } from "@aws-sdk/client-ec2";
import { RDSClient, RDSClientConfig } from "@aws-sdk/client-rds";
import { S3Client, S3ClientConfig } from "@aws-sdk/client-s3";

export const getRdsClient = (config: RDSClientConfig): RDSClient =>
  new RDSClient(config);

export const getS3Client = (config: S3ClientConfig): S3Client =>
  new S3Client(config);

export const getEC2Client = (config: EC2ClientConfig): EC2Client =>
  new EC2Client(config);
