import { getEC2Client } from "@/aws-clients";
import { SessionData } from "@/server";
import { HandlerReturnType } from "@/types/common";
import { formatResponse } from "@/utils/format-response";
import {
  DescribeInstancesCommand,
  RebootInstancesCommand,
  RunInstancesCommand,
  StartInstancesCommand,
  StopInstancesCommand,
  TerminateInstancesCommand,
} from "@aws-sdk/client-ec2";
import { Context } from "fastmcp";
import {
  LaunchEc2InstanceArgs,
  ListEc2InstancesArgs,
  RebootEc2InstanceArgs,
  StartEc2InstanceArgs,
  StopEc2InstanceArgs,
  TerminateEc2InstanceArgs,
} from "../../schema/ec2";

export const listEc2Instances = async (
  args: ListEc2InstancesArgs,
  context: Context<SessionData>
): Promise<HandlerReturnType> => {
  const { region, Ec2Args } = args;
  const ec2 = getEC2Client({
    region,
    credentials: context.session?.credentials,
  });
  const command = new DescribeInstancesCommand(Ec2Args);
  const response = await ec2.send(command);
  return formatResponse(response);
};

export const launchEc2Instance = async (
  args: LaunchEc2InstanceArgs,
  context: Context<SessionData>
): Promise<HandlerReturnType> => {
  const { region, Ec2Args } = args;
  const ec2 = getEC2Client({
    region,
    credentials: context.session?.credentials,
  });
  const command = new RunInstancesCommand(Ec2Args);
  const response = await ec2.send(command);
  return formatResponse(response);
};

export const stopEc2Instance = async (
  args: StopEc2InstanceArgs,
  context: Context<SessionData>
): Promise<HandlerReturnType> => {
  const { region, Ec2Args } = args;
  const ec2 = getEC2Client({
    region,
    credentials: context.session?.credentials,
  });
  const command = new StopInstancesCommand(Ec2Args);
  const response = await ec2.send(command);
  return formatResponse(response);
};

export const startEc2Instance = async (
  args: StartEc2InstanceArgs,
  context: Context<SessionData>
): Promise<HandlerReturnType> => {
  const { region, Ec2Args } = args;
  const ec2 = getEC2Client({
    region,
    credentials: context.session?.credentials,
  });
  const command = new StartInstancesCommand(Ec2Args);
  const response = await ec2.send(command);
  return formatResponse(response);
};

export const rebootEc2Instance = async (
  args: RebootEc2InstanceArgs,
  context: Context<SessionData>
): Promise<HandlerReturnType> => {
  const { region, Ec2Args } = args;
  const ec2 = getEC2Client({
    region,
    credentials: context.session?.credentials,
  });
  const command = new RebootInstancesCommand(Ec2Args);
  const response = await ec2.send(command);
  return formatResponse(response);
};

export const terminateEc2Instance = async (
  args: TerminateEc2InstanceArgs,
  context: Context<SessionData>
): Promise<HandlerReturnType> => {
  const { region, Ec2Args } = args;
  const ec2 = getEC2Client({
    region,
    credentials: context.session?.credentials,
  });
  const command = new TerminateInstancesCommand(Ec2Args);
  const response = await ec2.send(command);
  return formatResponse(response);
};
