import {
  createDBInstanceSchema,
  deleteDBInstanceSchema,
  listDBInstancesSchema,
} from "@/schema/rds";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import {
  createDbInstance,
  deleteDbInstance,
  listAllDbInstances,
} from "./handlers";

export const registerRdsTools = (server: McpServer): void => {
  server.tool(
    "rds-list-db-instances",
    "List all the RDS DB instances in the given region",
    listDBInstancesSchema,
    {
      destructiveHint: false,
      openWorldHint: true,
      readOnlyHint: true,
      idempotentHint: true,
      title: "List all the RDS DB instances",
    },
    async (args) => await listAllDbInstances(args)
  );
  server.tool(
    "rds-create-db-instance",
    "Create a new RDS DB instance",
    createDBInstanceSchema,
    {
      destructiveHint: true,
      openWorldHint: true,
      readOnlyHint: false,
      idempotentHint: false,
      title: "Create a new RDS DB instance",
    },
    async (args) => await createDbInstance(args)
  );
  server.tool(
    "rds-delete-db-instance",
    "Delete a given RDS DB instance",
    deleteDBInstanceSchema,
    {
      destructiveHint: true,
      openWorldHint: true,
      readOnlyHint: false,
      idempotentHint: false,
      title: "Delete a given RDS DB instance",
    },
    async (args) => await deleteDbInstance(args)
  );
};
