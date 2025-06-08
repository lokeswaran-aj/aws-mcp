import { getRdsClient } from "@/aws-clients";
import {
  CreateDBInstanceArgs,
  DeleteDBInstanceArgs,
  ListDBInstancesArgs,
  UpdateDBInstanceArgs,
} from "@/schema/rds";
import { HandlerReturnType } from "@/types/common";
import {
  CreateDBInstanceCommand,
  DeleteDBInstanceCommand,
  DescribeDBInstancesCommand,
  ModifyDBInstanceCommand,
} from "@aws-sdk/client-rds";

export const listAllDbInstances = async (
  args: ListDBInstancesArgs
): Promise<HandlerReturnType> => {
  const rdsClient = getRdsClient({ region: args.region });
  const command = new DescribeDBInstancesCommand(args.DBInstanceArgs);
  const response = await rdsClient.send(command);
  return {
    content: [
      {
        type: "text" as const,
        text: JSON.stringify(response, null, 2),
      },
    ],
  };
};

export const createDbInstance = async (
  args: CreateDBInstanceArgs
): Promise<HandlerReturnType> => {
  const rdsClient = getRdsClient({ region: args.region });
  const command = new CreateDBInstanceCommand(args.DBInstanceArgs);
  const response = await rdsClient.send(command);
  return {
    content: [
      {
        type: "text" as const,
        text: JSON.stringify(response, null, 2),
      },
    ],
  };
};

export const deleteDbInstance = async (
  args: DeleteDBInstanceArgs
): Promise<HandlerReturnType> => {
  const rdsClient = getRdsClient({ region: args.region });
  const command = new DeleteDBInstanceCommand(args.DBInstanceArgs);
  const response = await rdsClient.send(command);
  return {
    content: [
      {
        type: "text" as const,
        text: JSON.stringify(response, null, 2),
      },
    ],
  };
};

export const updateDbInstance = async (
  args: UpdateDBInstanceArgs
): Promise<HandlerReturnType> => {
  const rdsClient = getRdsClient({ region: args.region });
  const command = new ModifyDBInstanceCommand(args.DBInstanceArgs);
  const response = await rdsClient.send(command);
  return {
    content: [
      {
        type: "text" as const,
        text: JSON.stringify(response, null, 2),
      },
    ],
  };
};
