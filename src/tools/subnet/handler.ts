import { getEC2Client } from "@/aws-clients";
import {
  CreateSubnetArgs,
  DeleteSubnetArgs,
  ListSubnetsArgs,
  UpdateSubnetAttributeArgs,
} from "@/schema/subnet";
import { SessionData } from "@/server";
import { HandlerReturnType } from "@/types/common";
import { formatResponse } from "@/utils/format-response";
import {
  CreateSubnetCommand,
  DeleteSubnetCommand,
  DescribeSubnetsCommand,
  ModifySubnetAttributeCommand,
} from "@aws-sdk/client-ec2";
import { Context } from "fastmcp";

export const listSubnets = async (
  args: ListSubnetsArgs,
  context: Context<SessionData>
): Promise<HandlerReturnType> => {
  const ec2Client = getEC2Client({
    region: args.region,
    credentials: context.session?.credentials,
  });
  const command = new DescribeSubnetsCommand(args.SubnetArgs);
  const response = await ec2Client.send(command);
  return formatResponse(response);
};

export const createSubnet = async (
  args: CreateSubnetArgs,
  context: Context<SessionData>
): Promise<HandlerReturnType> => {
  const ec2Client = getEC2Client({
    region: args.region,
    credentials: context.session?.credentials,
  });
  const command = new CreateSubnetCommand(args.SubnetArgs);
  const response = await ec2Client.send(command);
  return formatResponse(response);
};

export const updateSubnetAttribute = async (
  args: UpdateSubnetAttributeArgs,
  context: Context<SessionData>
): Promise<HandlerReturnType> => {
  const ec2Client = getEC2Client({
    region: args.region,
    credentials: context.session?.credentials,
  });
  const command = new ModifySubnetAttributeCommand(args.SubnetArgs);
  const response = await ec2Client.send(command);
  return formatResponse(response);
};

export const deleteSubnet = async (
  args: DeleteSubnetArgs,
  context: Context<SessionData>
): Promise<HandlerReturnType> => {
  const ec2Client = getEC2Client({
    region: args.region,
    credentials: context.session?.credentials,
  });
  const command = new DeleteSubnetCommand(args.SubnetArgs);
  const response = await ec2Client.send(command);
  return formatResponse(response);
};
