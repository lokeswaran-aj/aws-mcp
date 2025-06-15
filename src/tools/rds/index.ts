import {
  createDBInstanceSchema,
  deleteDBInstanceSchema,
  listDBInstancesSchema,
  updateDBInstanceSchema,
} from "@/schema/rds";
import { server } from "@/server";
import {
  createDbInstance,
  deleteDbInstance,
  listAllDbInstances,
  updateDbInstance,
} from "./handler";

export const registerRdsTools = (): void => {
  server.addTool({
    name: "list-db-instances",
    description: "List all the RDS DB instances in the given region",
    parameters: listDBInstancesSchema,
    annotations: {
      destructiveHint: false,
      openWorldHint: true,
      readOnlyHint: true,
      idempotentHint: true,
      title: "List all the RDS DB instances",
    },
    execute: async (args, context) => await listAllDbInstances(args, context),
  });

  server.addTool({
    name: "create-db-instance",
    description: "Create a new RDS DB instance in the given region",
    parameters: createDBInstanceSchema,
    annotations: {
      destructiveHint: true,
      openWorldHint: true,
      readOnlyHint: false,
      idempotentHint: false,
      title: "Create a new RDS DB instance",
    },
    execute: async (args, context) => await createDbInstance(args, context),
  });

  server.addTool({
    name: "delete-db-instance",
    description: "Delete a given RDS DB instance in the given region",
    parameters: deleteDBInstanceSchema,
    annotations: {
      destructiveHint: true,
      openWorldHint: true,
      readOnlyHint: false,
      idempotentHint: false,
      title: "Delete a given RDS DB instance",
    },
    execute: async (args, context) => await deleteDbInstance(args, context),
  });

  server.addTool({
    name: "update-db-instance",
    description: "Update a given RDS DB instance in the given region",
    parameters: updateDBInstanceSchema,
    annotations: {
      destructiveHint: true,
      openWorldHint: true,
      readOnlyHint: false,
      idempotentHint: false,
      title: "Update a given RDS DB instance",
    },
    execute: async (args, context) => await updateDbInstance(args, context),
  });
};
