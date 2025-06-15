import { getEC2Client } from "@/aws-clients";
import {
  CreateInstanceTagArgs,
  DeleteInstanceTagArgs,
  ListInstanceTagsArgs,
} from "@/schema/instance-tag";
import { SessionData } from "@/server";
import { HandlerReturnType } from "@/types/common";
import { formatResponse } from "@/utils/format-response";
import {
  CreateTagsCommand,
  DeleteTagsCommand,
  DescribeTagsCommand,
} from "@aws-sdk/client-ec2";
import { Context } from "fastmcp";

export const listInstanceTags = async (
  args: ListInstanceTagsArgs,
  context: Context<SessionData>
): Promise<HandlerReturnType> => {
  const { region, InstanceArgs } = args;
  const ec2 = getEC2Client({
    region,
    credentials: context.session?.credentials,
  });
  const command = new DescribeTagsCommand(InstanceArgs);
  const response = await ec2.send(command);
  return formatResponse(response);
};

export const createInstanceTag = async (
  args: CreateInstanceTagArgs,
  context: Context<SessionData>
): Promise<HandlerReturnType> => {
  const { region, InstanceArgs } = args;
  const ec2 = getEC2Client({
    region,
    credentials: context.session?.credentials,
  });
  const command = new CreateTagsCommand(InstanceArgs);
  const response = await ec2.send(command);
  return formatResponse(response);
};

export const deleteInstanceTag = async (
  args: DeleteInstanceTagArgs,
  context: Context<SessionData>
): Promise<HandlerReturnType> => {
  const { region, InstanceArgs } = args;
  const ec2 = getEC2Client({
    region,
    credentials: context.session?.credentials,
  });
  const command = new DeleteTagsCommand(InstanceArgs);
  const response = await ec2.send(command);
  return formatResponse(response);
};
