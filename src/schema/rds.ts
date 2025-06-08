import {
  CreateDBInstanceCommandInput,
  DeleteDBInstanceCommandInput,
  DescribeDBInstancesCommandInput,
} from "@aws-sdk/client-rds";
import { z } from "zod";
import { regionSchema } from "./common";

// Schema for listing DB instances
const describeDBInstancesBaseSchema = z.object({
  DBInstanceIdentifier: z
    .string()
    .min(1)
    .max(63)
    .regex(/^[a-z][a-z0-9-]*[a-z0-9]$/)
    .optional()
    .describe(
      "The DB instance identifier. If not provided, all instances will be listed."
    ),
}) satisfies z.ZodType<DescribeDBInstancesCommandInput>;

export const listDBInstancesSchema = {
  region: regionSchema,
  DBInstanceArgs: describeDBInstancesBaseSchema,
};

export type ListDBInstancesArgs = z.infer<
  ReturnType<typeof z.object<typeof listDBInstancesSchema>>
>;

// Schema for creating a DB instance
const createDBInstanceBaseSchema = z.object({
  DBInstanceIdentifier: z
    .string()
    .min(1)
    .max(63)
    .regex(/^[a-z][a-z0-9-]*[a-z0-9]$/)
    .describe("The DB instance identifier"),
  DBInstanceClass: z
    .string()
    .describe("The compute and memory capacity of the DB instance"),
  Engine: z
    .enum([
      "aurora-mysql",
      "aurora-postgresql",
      "mysql",
      "mariadb",
      "postgres",
      "oracle-ee",
      "oracle-se2",
      "sqlserver-ee",
      "sqlserver-se",
      "sqlserver-ex",
      "sqlserver-web",
    ])
    .describe("The name of the database engine"),
  MasterUsername: z
    .string()
    .min(1)
    .max(16)
    .default("superadmin")
    .optional()
    .describe("The master username for the DB instance"),
  MasterUserPassword: z
    .string()
    .min(8)
    .max(30)
    .regex(
      /^[^/"\\&']*$/,
      "Password cannot contain /, \", \\, &, or ' characters"
    )
    .default("secret-password" + Math.random().toString(36).substring(2, 15))
    .optional()
    .describe(
      "The master password for the DB instance. Cannot contain /, \", \\, &, or ' characters. Length: 8-30 characters."
    ),
  DBName: z
    .string()
    .min(1)
    .optional()
    .default("mydb")
    .describe("The name of the database to create"),
  AllocatedStorage: z
    .number()
    .min(20)
    .default(20)
    .optional()
    .describe("The amount of storage (in gibibytes) to allocate"),
  Port: z
    .number()
    .optional()
    .describe("The port number on which the database accepts connections"),
  Tags: z
    .array(
      z.object({
        Key: z.string().min(1),
        Value: z.string().min(1),
      })
    )
    .describe("The tags to apply to the DB instance")
    .optional()
    .default([{ Key: "Name", Value: "My-MCP-DB" }]),
}) satisfies z.ZodType<CreateDBInstanceCommandInput>;

export const createDBInstanceSchema = {
  region: regionSchema,
  DBInstanceArgs: createDBInstanceBaseSchema,
};

export type CreateDBInstanceArgs = z.infer<
  ReturnType<typeof z.object<typeof createDBInstanceSchema>>
>;

// Schema for deleting a DB instance
const deleteDBInstanceBaseSchema = z.object({
  DBInstanceIdentifier: z
    .string()
    .min(1)
    .max(63)
    .regex(/^[a-z][a-z0-9-]*[a-z0-9]$/)
    .describe("The DB instance identifier"),
  DeleteAutomatedBackups: z
    .boolean()
    .default(true)
    .optional()
    .describe(
      "Whether to delete automated backups. The default value is true."
    ),
  SkipFinalSnapshot: z
    .boolean()
    .default(true)
    .optional()
    .describe(
      "Determines whether a final DB snapshot is created before the DB instance is deleted"
    ),
  FinalDBSnapshotIdentifier: z
    .string()
    .optional()
    .describe(
      "The DBSnapshotIdentifier of the new DBSnapshot created when SkipFinalSnapshot is false"
    ),
}) satisfies z.ZodType<DeleteDBInstanceCommandInput>;

export const deleteDBInstanceSchema = {
  region: regionSchema,
  DBInstanceArgs: deleteDBInstanceBaseSchema,
};

export type DeleteDBInstanceArgs = z.infer<
  ReturnType<typeof z.object<typeof deleteDBInstanceSchema>>
>;
