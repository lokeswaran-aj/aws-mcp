import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { registerEc2Tools } from "./tools/ec2";
import { registerInternetGatewayTools } from "./tools/internet-gateway";
import { registerKeyPairTools } from "./tools/key-pair";
import { registerRdsTools } from "./tools/rds";
import { registerRouteTableTools } from "./tools/route-table";
import { registerS3Tools } from "./tools/s3";
import { registerSecurityGroupTools } from "./tools/security-group";
import { registerSubnetTools } from "./tools/subnet";
import { registerVpcTools } from "./tools/vpc";

export const server = new McpServer(
  {
    name: "aws",
    version: "0.0.1",
    description: "AWS MCP Server",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// Register all tools
void registerRdsTools(server);
void registerS3Tools(server);
void registerVpcTools(server);
void registerSubnetTools(server);
void registerInternetGatewayTools(server);
void registerRouteTableTools(server);
void registerSecurityGroupTools(server);
void registerKeyPairTools(server);
void registerEc2Tools(server);
