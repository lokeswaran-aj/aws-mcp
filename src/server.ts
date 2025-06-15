import { FastMCP } from "fastmcp";
import { registerVpcTools } from "./tools/vpc";

export const server = new FastMCP({
  name: "aws",
  version: "0.0.1",
});

// Register all tools
// void registerRdsTools(server);
// void registerS3Tools(server);
void registerVpcTools();
// void registerSubnetTools(server);
// void registerInternetGatewayTools(server);
// void registerRouteTableTools(server);
// void registerSecurityGroupTools(server);
// void registerKeyPairTools(server);
// void registerEc2Tools(server);
// void registerAmiTools(server);
// void registerInstanceTagTools(server);

void server.start({
  httpStream: {
    port: 8080,
    endpoint: "/mcp",
  },
  transportType: "httpStream",
});
