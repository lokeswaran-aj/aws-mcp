import {
  AttachInternetGatewayArgs,
  CreateInternetGatewayArgs,
  DeleteInternetGatewayArgs,
  DetachInternetGatewayArgs,
  ListInternetGatewaysArgs,
} from "@/schema/internet-gateway";
import { SessionData } from "@/server";
import { HandlerReturnType } from "@/types/common";
import { formatResponse } from "@/utils/format-response";
import {
  AttachInternetGatewayCommand,
  CreateInternetGatewayCommand,
  DeleteInternetGatewayCommand,
  DescribeInternetGatewaysCommand,
  DetachInternetGatewayCommand,
  EC2Client,
} from "@aws-sdk/client-ec2";
import { Context } from "fastmcp";

export const listInternetGateways = async (
  args: ListInternetGatewaysArgs,
  context: Context<SessionData>
): Promise<HandlerReturnType> => {
  const { region, InternetGatewayArgs } = args;
  const ec2Client = new EC2Client({
    region,
    credentials: context.session?.credentials,
  });
  const command = new DescribeInternetGatewaysCommand(InternetGatewayArgs);
  const response = await ec2Client.send(command);
  return formatResponse(response);
};

export const createInternetGateway = async (
  args: CreateInternetGatewayArgs,
  context: Context<SessionData>
): Promise<HandlerReturnType> => {
  const { region, InternetGatewayArgs } = args;
  const ec2Client = new EC2Client({
    region,
    credentials: context.session?.credentials,
  });
  const command = new CreateInternetGatewayCommand(InternetGatewayArgs);
  const response = await ec2Client.send(command);
  return formatResponse(response);
};

export const deleteInternetGateway = async (
  args: DeleteInternetGatewayArgs,
  context: Context<SessionData>
): Promise<HandlerReturnType> => {
  const { region, InternetGatewayArgs } = args;
  const ec2Client = new EC2Client({
    region,
    credentials: context.session?.credentials,
  });
  const command = new DeleteInternetGatewayCommand(InternetGatewayArgs);
  const response = await ec2Client.send(command);
  return formatResponse(response);
};

export const attachInternetGateway = async (
  args: AttachInternetGatewayArgs,
  context: Context<SessionData>
): Promise<HandlerReturnType> => {
  const { region, InternetGatewayArgs } = args;
  const ec2Client = new EC2Client({
    region,
    credentials: context.session?.credentials,
  });
  const command = new AttachInternetGatewayCommand(InternetGatewayArgs);
  const response = await ec2Client.send(command);
  return formatResponse(response);
};

export const detachInternetGateway = async (
  args: DetachInternetGatewayArgs,
  context: Context<SessionData>
): Promise<HandlerReturnType> => {
  const { region, InternetGatewayArgs } = args;
  const ec2Client = new EC2Client({
    region,
    credentials: context.session?.credentials,
  });
  const command = new DetachInternetGatewayCommand(InternetGatewayArgs);
  const response = await ec2Client.send(command);
  return formatResponse(response);
};
