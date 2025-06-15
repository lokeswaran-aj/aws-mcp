import { FastMCP } from "fastmcp";
import { registerAmiTools } from "./tools/ami";
import { registerEc2Tools } from "./tools/ec2";
import { registerInstanceTagTools } from "./tools/instance-tag";
import { registerInternetGatewayTools } from "./tools/internet-gateway";
import { registerKeyPairTools } from "./tools/key-pair";
import { registerRdsTools } from "./tools/rds";
import { registerRouteTableTools } from "./tools/route-table";
import { registerS3Tools } from "./tools/s3";
import { registerSecurityGroupTools } from "./tools/security-group";
import { registerSubnetTools } from "./tools/subnet";
import { registerVpcTools } from "./tools/vpc";

export interface SessionData {
  credentials: {
    accessKeyId: string;
    secretAccessKey: string;
    sessionToken?: string;
  };
  [key: string]: unknown;
}

export const server = new FastMCP({
  name: "aws",
  version: "0.0.2",
  authenticate: async (request): Promise<SessionData> => {
    const credentials = {
      accessKeyId: request.headers["aws_access_key_id"] as string,
      secretAccessKey: request.headers["aws_secret_access_key"] as string,
      sessionToken: request.headers["aws_session_token"] as string,
    };
    return {
      credentials,
    };
  },
});

// Register all tools
registerVpcTools();
registerRdsTools();
registerS3Tools();
registerSubnetTools();
registerInternetGatewayTools();
registerRouteTableTools();
registerSecurityGroupTools();
registerKeyPairTools();
registerEc2Tools();
registerAmiTools();
registerInstanceTagTools();

server.start({
  httpStream: {
    port: 8080,
    endpoint: "/mcp",
  },
  transportType: "httpStream",
});
