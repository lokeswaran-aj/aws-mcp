import { FastMCP } from "fastmcp";
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
  version: "0.0.1",
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
// void registerRdsTools(server);
// void registerS3Tools(server);
// void registerSubnetTools(server);
// void registerInternetGatewayTools(server);
// void registerRouteTableTools(server);
// void registerSecurityGroupTools(server);
// void registerKeyPairTools(server);
// void registerEc2Tools(server);
// void registerAmiTools(server);
// void registerInstanceTagTools(server);

server.start({
  httpStream: {
    port: 8080,
    endpoint: "/mcp",
  },
  transportType: "httpStream",
});
