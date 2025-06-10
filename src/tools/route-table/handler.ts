import {
  AssociateRouteTableArgs,
  CreateRouteTablesArgs,
  DisassociateRouteTableArgs,
  ListRouteTablesArgs,
} from "@/schema/route-table";
import { HandlerReturnType } from "@/types/common";
import { formatResponse } from "@/utils/format-response";
import {
  AssociateRouteTableCommand,
  CreateRouteTableCommand,
  DescribeRouteTablesCommand,
  DisassociateRouteTableCommand,
  EC2Client,
} from "@aws-sdk/client-ec2";

export const listRouteTables = async (
  args: ListRouteTablesArgs
): Promise<HandlerReturnType> => {
  const { region, RouteTableArgs } = args;
  const ec2Client = new EC2Client({ region });
  const command = new DescribeRouteTablesCommand(RouteTableArgs);
  const response = await ec2Client.send(command);
  return formatResponse(response);
};

export const createRouteTable = async (
  args: CreateRouteTablesArgs
): Promise<HandlerReturnType> => {
  const { region, RouteTableArgs } = args;
  const ec2Client = new EC2Client({ region });
  const command = new CreateRouteTableCommand(RouteTableArgs);
  const response = await ec2Client.send(command);
  return formatResponse(response);
};

export const associateRouteTable = async (
  args: AssociateRouteTableArgs
): Promise<HandlerReturnType> => {
  const { region, RouteTableArgs } = args;
  const ec2Client = new EC2Client({ region });
  const command = new AssociateRouteTableCommand(RouteTableArgs);
  const response = await ec2Client.send(command);
  return formatResponse(response);
};

export const disassociateRouteTable = async (
  args: DisassociateRouteTableArgs
): Promise<HandlerReturnType> => {
  const { region, RouteTableArgs } = args;
  const ec2Client = new EC2Client({ region });
  const command = new DisassociateRouteTableCommand(RouteTableArgs);
  const response = await ec2Client.send(command);
  return formatResponse(response);
};
