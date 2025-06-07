import { RDSClient, RDSClientConfig } from "@aws-sdk/client-rds";
import { appConfig } from "./config/app";

const { accessKeyId, secretAccessKey, sessionToken } = appConfig.awsCredentials;

if (!accessKeyId || !secretAccessKey || !sessionToken) {
  throw new Error(
    "AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, and AWS_SESSION_TOKEN must be set"
  );
}

export const getRdsClient = (config: RDSClientConfig): RDSClient =>
  new RDSClient({
    ...config,
    credentials: {
      accessKeyId,
      secretAccessKey,
      sessionToken,
    },
  });
