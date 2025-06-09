import { getEC2Client } from "@/aws-clients";
import {
  CreateVpcArgs,
  DeleteVpcArgs,
  ListVpcsArgs,
  UpdateVpcAttributeArgs,
  UpdateVpcEndpointArgs,
} from "@/schema/vpc";
import { HandlerReturnType } from "@/types/common";
import { formatResponse } from "@/utils/format-response";
import {
  CreateVpcCommand,
  DeleteVpcCommand,
  DescribeVpcsCommand,
  ModifyVpcAttributeCommand,
  ModifyVpcEndpointCommand,
} from "@aws-sdk/client-ec2";

export const listVpcs = async (
  input: ListVpcsArgs
): Promise<HandlerReturnType> => {
  const ec2Client = getEC2Client({ region: input.region });
  const command = new DescribeVpcsCommand(input.VpcArgs);
  const response = await ec2Client.send(command);
  return formatResponse(response);
};

export const createVpc = async (
  input: CreateVpcArgs
): Promise<HandlerReturnType> => {
  const ec2Client = getEC2Client({ region: input.region });
  const command = new CreateVpcCommand(input.VpcArgs);
  const response = await ec2Client.send(command);
  return formatResponse(response);
};

export const deleteVpc = async (
  input: DeleteVpcArgs
): Promise<HandlerReturnType> => {
  const ec2Client = getEC2Client({ region: input.region });
  const command = new DeleteVpcCommand(input.VpcArgs);
  const response = await ec2Client.send(command);
  return formatResponse(response);
};

export const updateVpcAttribute = async (
  input: UpdateVpcAttributeArgs
): Promise<HandlerReturnType> => {
  const ec2Client = getEC2Client({ region: input.region });
  const command = new ModifyVpcAttributeCommand(input.VpcArgs);
  const response = await ec2Client.send(command);
  return formatResponse(response);
};

export const updateVpcEndpoint = async (
  input: UpdateVpcEndpointArgs
): Promise<HandlerReturnType> => {
  const ec2Client = getEC2Client({ region: input.region });
  const command = new ModifyVpcEndpointCommand(input.VpcArgs);
  const response = await ec2Client.send(command);
  return formatResponse(response);
};
