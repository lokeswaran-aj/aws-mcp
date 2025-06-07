import { RdsListInstancesSchema } from "@/types/rds";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { listAllDbInstances } from "./handlers";

export const registerRdsTools = (server: McpServer): void => {
  server.tool(
    "rds-list-db-instances",
    "List all the RDS DB instances in the given region",
    RdsListInstancesSchema,
    {
      destructiveHint: false,
      openWorldHint: true,
      readOnlyHint: true,
      idempotentHint: true,
      title: "List all the RDS DB instances",
    },
    async (args) => await listAllDbInstances(args)
  );
};
