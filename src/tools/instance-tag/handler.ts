import { getEC2Client } from "@/aws-clients";
import {
  CreateInstanceTagArgs,
  DeleteInstanceTagArgs,
  ListInstanceTagsArgs,
} from "@/schema/instance-tag";
import { HandlerReturnType } from "@/types/common";
import { formatResponse } from "@/utils/format-response";
import {
  CreateTagsCommand,
  DeleteTagsCommand,
  DescribeTagsCommand,
} from "@aws-sdk/client-ec2";

export const listInstanceTags = async (
  args: ListInstanceTagsArgs
): Promise<HandlerReturnType> => {
  const { region, InstanceArgs } = args;
  const ec2 = getEC2Client({ region });
  const command = new DescribeTagsCommand(InstanceArgs);
  const response = await ec2.send(command);
  return formatResponse(response);
};

export const createInstanceTag = async (
  args: CreateInstanceTagArgs
): Promise<HandlerReturnType> => {
  const { region, InstanceArgs } = args;
  const ec2 = getEC2Client({ region });
  const command = new CreateTagsCommand(InstanceArgs);
  const response = await ec2.send(command);
  return formatResponse(response);
};

export const deleteInstanceTag = async (
  args: DeleteInstanceTagArgs
): Promise<HandlerReturnType> => {
  const { region, InstanceArgs } = args;
  const ec2 = getEC2Client({ region });
  const command = new DeleteTagsCommand(InstanceArgs);
  const response = await ec2.send(command);
  return formatResponse(response);
};
