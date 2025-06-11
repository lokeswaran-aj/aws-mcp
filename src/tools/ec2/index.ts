import { launchEc2InstanceSchema, listEc2InstancesSchema } from "@/schema/ec2";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp";
import { launchEc2Instance, listEc2Instances } from "./handler";

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

  server.tool(
    "ec2-launch-ec2-instance",
    "Launch an EC2 instance in a given region",
    launchEc2InstanceSchema,
    {
      destructiveHint: false,
      title: "Launch EC2 instance",
    },
    async (args) => launchEc2Instance(args)
  );
};
