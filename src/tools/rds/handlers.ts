import { getRdsClient } from "@/aws-clients";
import { CreateDBInstanceArgs, ListDBInstancesArgs } from "@/schema/rds";
import {
  CreateDBInstanceCommand,
  DescribeDBInstancesCommand,
} from "@aws-sdk/client-rds";

export const listAllDbInstances = async (
  args: ListDBInstancesArgs
): Promise<{ content: { type: "text"; text: string }[] }> => {
  const rdsClient = getRdsClient({ region: args.region });
  const command = new DescribeDBInstancesCommand(args.DBInstanceArgs);
  const response = await rdsClient.send(command);
  return {
    content: [
      {
        type: "text" as const,
        text: `${
          response.DBInstances
            ? `Listing all RDS DB instances in ${args.region} region:\n${response.DBInstances.map(
                (instance) => `- ${JSON.stringify(instance, null, 2)}`
              ).join("\n\n")}`
            : "No RDS DB instances found"
        }`,
      },
    ],
  };
};

export const createDbInstance = async (
  args: CreateDBInstanceArgs
): Promise<{ content: { type: "text"; text: string }[] }> => {
  const rdsClient = getRdsClient({ region: args.region });
  const command = new CreateDBInstanceCommand(args.DBInstanceArgs);
  const response = await rdsClient.send(command);
  return {
    content: [
      {
        type: "text" as const,
        text: `DB instance created: ${response.DBInstance?.DBInstanceIdentifier}`,
      },
    ],
  };
};
