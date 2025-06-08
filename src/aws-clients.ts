import { RDSClient, RDSClientConfig } from "@aws-sdk/client-rds";
import { appConfig } from "./config/app";

const { accessKeyId, secretAccessKey, sessionToken } = appConfig.awsCredentials;

export const getRdsClient = (config: RDSClientConfig): RDSClient =>
  new RDSClient({
    ...config,
    credentials: {
      accessKeyId: accessKeyId ?? "",
      secretAccessKey: secretAccessKey ?? "",
      sessionToken: sessionToken ?? "",
    },
  });
