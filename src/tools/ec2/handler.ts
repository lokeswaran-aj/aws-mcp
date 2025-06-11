import { getEC2Client } from "@/aws-clients";
import { HandlerReturnType } from "@/types/common";
import { formatResponse } from "@/utils/format-response";
import {
  DescribeInstancesCommand,
  RunInstancesCommand,
  StopInstancesCommand,
} from "@aws-sdk/client-ec2";
import {
  LaunchEc2InstanceArgs,
  ListEc2InstancesArgs,
  StopEc2InstanceArgs,
} from "../../schema/ec2";

export const listEc2Instances = async (
  args: ListEc2InstancesArgs
): Promise<HandlerReturnType> => {
  const { region, Ec2Args } = args;
  const ec2 = getEC2Client({ region });
  const command = new DescribeInstancesCommand(Ec2Args);
  const response = await ec2.send(command);
  return formatResponse(response);
};

export const launchEc2Instance = async (
  args: LaunchEc2InstanceArgs
): Promise<HandlerReturnType> => {
  const { region, Ec2Args } = args;
  const ec2 = getEC2Client({ region });
  const command = new RunInstancesCommand(Ec2Args);
  const response = await ec2.send(command);
  return formatResponse(response);
};

export const stopEc2Instance = async (
  args: StopEc2InstanceArgs
): Promise<HandlerReturnType> => {
  const { region, Ec2Args } = args;
  const ec2 = getEC2Client({ region });
  const command = new StopInstancesCommand(Ec2Args);
  const response = await ec2.send(command);
  return formatResponse(response);
};
