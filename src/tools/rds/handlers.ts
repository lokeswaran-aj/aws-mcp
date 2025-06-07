import { getRdsClient } from "@/aws-clients";
import { RdsListInstancesArgs } from "@/types/rds";
import { DescribeDBInstancesCommand } from "@aws-sdk/client-rds";

export const listAllDbInstances = async (
  args: RdsListInstancesArgs
): Promise<{ content: { type: "text"; text: string }[] }> => {
  const rdsClient = getRdsClient({ region: args.region });
  const command = new DescribeDBInstancesCommand();
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
