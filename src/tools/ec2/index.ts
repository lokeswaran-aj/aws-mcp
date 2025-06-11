import {
  launchEc2InstanceSchema,
  listEc2InstancesSchema,
  rebootEc2InstanceSchema,
  startEc2InstanceSchema,
  stopEc2InstanceSchema,
} from "@/schema/ec2";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp";
import {
  launchEc2Instance,
  listEc2Instances,
  rebootEc2Instance,
  startEc2Instance,
  stopEc2Instance,
} from "./handler";

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

  server.tool(
    "ec2-stop-ec2-instance",
    "Stop an EC2 instance in a given region",
    stopEc2InstanceSchema,
    {
      title: "Stop EC2 instance",
      destructiveHint: false,
      idempotentHint: true,
      readOnlyHint: false,
    },
    async (args) => stopEc2Instance(args)
  );

  server.tool(
    "ec2-start-ec2-instance",
    "Start an EC2 instance in a given region",
    startEc2InstanceSchema,
    {
      title: "Start EC2 instance",
      destructiveHint: false,
      idempotentHint: true,
      readOnlyHint: false,
    },
    async (args) => startEc2Instance(args)
  );

  server.tool(
    "ec2-reboot-ec2-instance",
    "Reboot an EC2 instance in a given region",
    rebootEc2InstanceSchema,
    {
      title: "Reboot EC2 instance",
      destructiveHint: false,
      idempotentHint: true,
      readOnlyHint: false,
    },
    async (args) => rebootEc2Instance(args)
  );
};
