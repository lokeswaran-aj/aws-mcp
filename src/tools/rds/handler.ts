import { getRdsClient } from "@/aws-clients";
import {
  CreateDBInstanceArgs,
  DeleteDBInstanceArgs,
  ListDBInstancesArgs,
  UpdateDBInstanceArgs,
} from "@/schema/rds";
import { SessionData } from "@/server";
import { HandlerReturnType } from "@/types/common";
import { formatResponse } from "@/utils/format-response";
import {
  CreateDBInstanceCommand,
  DeleteDBInstanceCommand,
  DescribeDBInstancesCommand,
  ModifyDBInstanceCommand,
} from "@aws-sdk/client-rds";
import { Context } from "fastmcp";

export const listAllDbInstances = async (
  args: ListDBInstancesArgs,
  context: Context<SessionData>
): Promise<HandlerReturnType> => {
  const rdsClient = getRdsClient({
    region: args.region,
    credentials: context.session?.credentials,
  });
  const command = new DescribeDBInstancesCommand(args.DBInstanceArgs);
  const response = await rdsClient.send(command);
  return formatResponse(response);
};

export const createDbInstance = async (
  args: CreateDBInstanceArgs,
  context: Context<SessionData>
): Promise<HandlerReturnType> => {
  const rdsClient = getRdsClient({
    region: args.region,
    credentials: context.session?.credentials,
  });
  const command = new CreateDBInstanceCommand(args.DBInstanceArgs);
  const response = await rdsClient.send(command);
  return formatResponse(response);
};

export const deleteDbInstance = async (
  args: DeleteDBInstanceArgs,
  context: Context<SessionData>
): Promise<HandlerReturnType> => {
  const rdsClient = getRdsClient({
    region: args.region,
    credentials: context.session?.credentials,
  });
  const command = new DeleteDBInstanceCommand(args.DBInstanceArgs);
  const response = await rdsClient.send(command);
  return formatResponse(response);
};

export const updateDbInstance = async (
  args: UpdateDBInstanceArgs,
  context: Context<SessionData>
): Promise<HandlerReturnType> => {
  const rdsClient = getRdsClient({
    region: args.region,
    credentials: context.session?.credentials,
  });
  const command = new ModifyDBInstanceCommand(args.DBInstanceArgs);
  const response = await rdsClient.send(command);
  return formatResponse(response);
};
