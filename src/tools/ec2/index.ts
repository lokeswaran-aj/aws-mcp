import {
  launchEc2InstanceSchema,
  listEc2InstancesSchema,
  rebootEc2InstanceSchema,
  startEc2InstanceSchema,
  stopEc2InstanceSchema,
  terminateEc2InstanceSchema,
} from "@/schema/ec2";
import { server } from "@/server";
import {
  launchEc2Instance,
  listEc2Instances,
  rebootEc2Instance,
  startEc2Instance,
  stopEc2Instance,
  terminateEc2Instance,
} from "./handler";

export const registerEc2Tools = (): void => {
  server.addTool({
    name: "list-ec2-instances",
    description: "List EC2 instances in a given region",
    parameters: listEc2InstancesSchema,
    annotations: {
      destructiveHint: false,
      readOnlyHint: true,
      idempotentHint: true,
      openWorldHint: true,
      title: "List EC2 instances",
    },
    execute: async (args, context) => await listEc2Instances(args, context),
  });

  server.addTool({
    name: "launch-ec2-instance",
    description: "Launch an EC2 instance in a given region",
    parameters: launchEc2InstanceSchema,
    annotations: {
      destructiveHint: false,
      title: "Launch EC2 instance",
    },
    execute: async (args, context) => await launchEc2Instance(args, context),
  });

  server.addTool({
    name: "stop-ec2-instance",
    description: "Stop an EC2 instance in a given region",
    parameters: stopEc2InstanceSchema,
    annotations: {
      title: "Stop EC2 instance",
      destructiveHint: false,
      idempotentHint: true,
      readOnlyHint: false,
    },
    execute: async (args, context) => await stopEc2Instance(args, context),
  });

  server.addTool({
    name: "start-ec2-instance",
    description: "Start an EC2 instance in a given region",
    parameters: startEc2InstanceSchema,
    annotations: {
      title: "Start EC2 instance",
      destructiveHint: false,
      idempotentHint: true,
      readOnlyHint: false,
    },
    execute: async (args, context) => await startEc2Instance(args, context),
  });

  server.addTool({
    name: "reboot-ec2-instance",
    description: "Reboot an EC2 instance in a given region",
    parameters: rebootEc2InstanceSchema,
    annotations: {
      title: "Reboot EC2 instance",
      destructiveHint: false,
      idempotentHint: true,
      readOnlyHint: false,
    },
    execute: async (args, context) => await rebootEc2Instance(args, context),
  });

  server.addTool({
    name: "terminate-ec2-instance",
    description: "Terminate an EC2 instance in a given region",
    parameters: terminateEc2InstanceSchema,
    annotations: {
      title: "Terminate EC2 instance",
      destructiveHint: true,
      idempotentHint: true,
      readOnlyHint: false,
    },
    execute: async (args, context) => await terminateEc2Instance(args, context),
  });
};
