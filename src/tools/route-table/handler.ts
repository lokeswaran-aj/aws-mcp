import { getEC2Client } from "@/aws-clients";
import {
  AssociateRouteTableArgs,
  CreateRouteTableArgs,
  DeleteRouteTableArgs,
  DisassociateRouteTableArgs,
  ListRouteTablesArgs,
  ReplaceRouteTableAssociationArgs,
} from "@/schema/route-table";
import { SessionData } from "@/server";
import { HandlerReturnType } from "@/types/common";
import { formatResponse } from "@/utils/format-response";
import {
  AssociateRouteTableCommand,
  CreateRouteTableCommand,
  DeleteRouteTableCommand,
  DescribeRouteTablesCommand,
  DisassociateRouteTableCommand,
  ReplaceRouteTableAssociationCommand,
} from "@aws-sdk/client-ec2";
import { Context } from "fastmcp";

export const listRouteTables = async (
  args: ListRouteTablesArgs,
  context: Context<SessionData>
): Promise<HandlerReturnType> => {
  const { region, RouteTableArgs } = args;
  const ec2Client = getEC2Client({
    region,
    credentials: context.session?.credentials,
  });
  const command = new DescribeRouteTablesCommand(RouteTableArgs);
  const response = await ec2Client.send(command);
  return formatResponse(response);
};

export const createRouteTable = async (
  args: CreateRouteTableArgs,
  context: Context<SessionData>
): Promise<HandlerReturnType> => {
  const { region, RouteTableArgs } = args;
  const ec2Client = getEC2Client({
    region,
    credentials: context.session?.credentials,
  });
  const command = new CreateRouteTableCommand(RouteTableArgs);
  const response = await ec2Client.send(command);
  return formatResponse(response);
};

export const associateRouteTable = async (
  args: AssociateRouteTableArgs,
  context: Context<SessionData>
): Promise<HandlerReturnType> => {
  const { region, RouteTableArgs } = args;
  const ec2Client = getEC2Client({
    region,
    credentials: context.session?.credentials,
  });
  const command = new AssociateRouteTableCommand(RouteTableArgs);
  const response = await ec2Client.send(command);
  return formatResponse(response);
};

export const disassociateRouteTable = async (
  args: DisassociateRouteTableArgs,
  context: Context<SessionData>
): Promise<HandlerReturnType> => {
  const { region, RouteTableArgs } = args;
  const ec2Client = getEC2Client({
    region,
    credentials: context.session?.credentials,
  });
  const command = new DisassociateRouteTableCommand(RouteTableArgs);
  const response = await ec2Client.send(command);
  return formatResponse(response);
};

export const replaceRouteTableAssociation = async (
  args: ReplaceRouteTableAssociationArgs,
  context: Context<SessionData>
): Promise<HandlerReturnType> => {
  const { region, RouteTableArgs } = args;
  const ec2Client = getEC2Client({
    region,
    credentials: context.session?.credentials,
  });
  const command = new ReplaceRouteTableAssociationCommand(RouteTableArgs);
  const response = await ec2Client.send(command);
  return formatResponse(response);
};

export const deleteRouteTable = async (
  args: DeleteRouteTableArgs,
  context: Context<SessionData>
): Promise<HandlerReturnType> => {
  const { region, RouteTableArgs } = args;
  const ec2Client = getEC2Client({
    region,
    credentials: context.session?.credentials,
  });
  const command = new DeleteRouteTableCommand(RouteTableArgs);
  const response = await ec2Client.send(command);
  return formatResponse(response);
};
