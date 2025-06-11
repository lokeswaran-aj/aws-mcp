import { listEc2InstancesSchema } from "@/schema/ec2";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp";
import { listEc2Instances } from "./handler";

export const registerEc2Tools = (server: McpServer): void => {
  server.tool(
    "ec2-list-ec2-instances",
    "List EC2 instances in a given region",
    listEc2InstancesSchema,
    {
      destructiveHint: false,
      readOnlyHint: true,
      idempotentHint: true,
      openWorldHint: true,
      title: "List EC2 instances",
    },
    async (args) => listEc2Instances(args)
  );
};
