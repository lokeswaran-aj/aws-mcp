import {
  AttachInternetGatewayArgs,
  CreateInternetGatewayArgs,
  DeleteInternetGatewayArgs,
  DetachInternetGatewayArgs,
  ListInternetGatewaysArgs,
} from "@/schema/internet-gateway";
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

export const listInternetGateways = async (
  args: ListInternetGatewaysArgs
): Promise<HandlerReturnType> => {
  const { region, InternetGatewayArgs } = args;
  const ec2Client = new EC2Client({ region });
  const command = new DescribeInternetGatewaysCommand(InternetGatewayArgs);
  const response = await ec2Client.send(command);
  return formatResponse(response);
};

export const createInternetGateway = async (
  args: CreateInternetGatewayArgs
): Promise<HandlerReturnType> => {
  const { region, InternetGatewayArgs } = args;
  const ec2Client = new EC2Client({ region });
  const command = new CreateInternetGatewayCommand(InternetGatewayArgs);
  const response = await ec2Client.send(command);
  return formatResponse(response);
};

export const deleteInternetGateway = async (
  args: DeleteInternetGatewayArgs
): Promise<HandlerReturnType> => {
  const { region, InternetGatewayArgs } = args;
  const ec2Client = new EC2Client({ region });
  const command = new DeleteInternetGatewayCommand(InternetGatewayArgs);
  const response = await ec2Client.send(command);
  return formatResponse(response);
};

export const attachInternetGateway = async (
  args: AttachInternetGatewayArgs
): Promise<HandlerReturnType> => {
  const { region, InternetGatewayArgs } = args;
  const ec2Client = new EC2Client({ region });
  const command = new AttachInternetGatewayCommand(InternetGatewayArgs);
  const response = await ec2Client.send(command);
  return formatResponse(response);
};

export const detachInternetGateway = async (
  args: DetachInternetGatewayArgs
): Promise<HandlerReturnType> => {
  const { region, InternetGatewayArgs } = args;
  const ec2Client = new EC2Client({ region });
  const command = new DetachInternetGatewayCommand(InternetGatewayArgs);
  const response = await ec2Client.send(command);
  return formatResponse(response);
};
