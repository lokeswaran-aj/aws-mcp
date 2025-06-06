import { RdsListInstancesArgs } from "@/types/rds";

export const listAllDbInstances = async (args: RdsListInstancesArgs) => {
  return {
    content: [
      {
        type: "text" as const,
        text: `Listing all RDS DB instances in region: ${args.region}:\n1. todo-app-db\n2. ecommerce-db\n3. blog-db`,
      },
    ],
  };
};
