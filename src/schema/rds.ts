import {
  CreateDBInstanceCommandInput,
  DeleteDBInstanceCommandInput,
  DescribeDBInstancesCommandInput,
  ModifyDBInstanceCommandInput,
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

// Base schema with common fields for both create and update operations
const dbInstanceCommonSchema = z.object({
  DBInstanceIdentifier: z
    .string()
    .min(1)
    .max(63)
    .regex(/^[a-z][a-z0-9-]*[a-z0-9]$/)
    .describe("The DB instance identifier"),
  DBInstanceClass: z
    .string()
    .optional()
    .describe("The compute and memory capacity of the DB instance"),
  AllocatedStorage: z
    .number()
    .min(20)
    .optional()
    .describe("The amount of storage (in gibibytes) to allocate"),
  Port: z
    .number()
    .min(1150)
    .max(65535)
    .optional()
    .describe("The port number on which the database accepts connections"),
  BackupRetentionPeriod: z
    .number()
    .min(0)
    .max(35)
    .optional()
    .describe("The number of days to retain automated backups"),
  PreferredBackupWindow: z
    .string()
    .regex(/^([0-1][0-9]|2[0-3]):[0-5][0-9]-([0-1][0-9]|2[0-3]):[0-5][0-9]$/)
    .optional()
    .describe(
      "The daily time range during which automated backups are created"
    ),
  PreferredMaintenanceWindow: z
    .string()
    .optional()
    .describe(
      "The weekly time range during which system maintenance can occur"
    ),
  MultiAZ: z
    .boolean()
    .optional()
    .describe("Specifies if the DB instance is a Multi-AZ deployment"),
  EngineVersion: z
    .string()
    .optional()
    .describe("The version number of the database engine"),
  AutoMinorVersionUpgrade: z
    .boolean()
    .optional()
    .describe("Indicates that minor engine upgrades are applied automatically"),
  LicenseModel: z
    .string()
    .optional()
    .describe("License model information for this DB instance"),
  Iops: z
    .number()
    .optional()
    .describe("The Provisioned IOPS (I/O operations per second) value"),
  StorageType: z
    .enum(["standard", "gp2", "gp3", "io1", "io2"])
    .optional()
    .describe(
      "Specifies the storage type to be associated with the DB instance"
    ),
  DeletionProtection: z
    .boolean()
    .optional()
    .describe(
      "Indicates if the DB instance should have deletion protection enabled"
    ),
  MaxAllocatedStorage: z
    .number()
    .optional()
    .describe("The upper limit of allocated storage for autoscaling"),
  PubliclyAccessible: z
    .boolean()
    .optional()
    .describe("Specifies the accessibility options for the DB instance"),
  Tags: z
    .array(
      z.object({
        Key: z.string().min(1),
        Value: z.string().min(1),
      })
    )
    .optional()
    .describe("The tags to apply to the DB instance"),
  MasterUserPassword: z
    .string()
    .min(8)
    .max(41)
    .regex(
      /^[^/"\\&']*$/,
      "Password cannot contain /, \", \\, &, or ' characters"
    )
    .optional()
    .describe("The password for the master user"),
});

// Schema for creating a DB instance
const createDBInstanceBaseSchema = dbInstanceCommonSchema.extend({
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
    .regex(
      /^[a-zA-Z][a-zA-Z0-9_]*$/,
      "Must start with a letter and contain only alphanumeric characters and underscores"
    )
    .optional()
    .describe("The master username for the DB instance"),
  DBName: z
    .string()
    .min(1)
    .max(64)
    .regex(
      /^[a-zA-Z][a-zA-Z0-9_]*$/,
      "Must start with a letter and contain only alphanumeric characters and underscores"
    )
    .optional()
    .describe("The name of the database to create"),
  AvailabilityZone: z
    .string()
    .optional()
    .describe("The EC2 Availability Zone where the database will be created"),
  StorageEncrypted: z
    .boolean()
    .optional()
    .describe("Specifies whether the DB instance is encrypted"),
  KmsKeyId: z
    .string()
    .optional()
    .describe("The AWS KMS key identifier for encryption of the DB instance"),
  VpcSecurityGroupIds: z
    .array(z.string())
    .optional()
    .describe(
      "A list of EC2 VPC security groups to associate with this DB instance"
    ),
  DBSubnetGroupName: z
    .string()
    .optional()
    .describe("A DB subnet group to associate with this DB instance"),
}) satisfies z.ZodType<CreateDBInstanceCommandInput>;

// Schema for updating a DB instance
const updateDBInstanceBaseSchema = dbInstanceCommonSchema.extend({
  MonitoringInterval: z
    .number()
    .optional()
    .describe(
      "The interval, in seconds, between points when Enhanced Monitoring metrics are collected"
    ),
  CopyTagsToSnapshot: z
    .boolean()
    .optional()
    .describe(
      "Indicates whether to copy tags from the DB instance to snapshots"
    ),
  CACertificateIdentifier: z
    .string()
    .optional()
    .describe("The identifier of the CA certificate for this DB instance"),
  ApplyImmediately: z
    .boolean()
    .optional()
    .default(false)
    .describe(
      "Specifies whether the modifications in this request should be applied immediately"
    ),
}) satisfies z.ZodType<ModifyDBInstanceCommandInput>;

// Export types for the schemas
export type ListDBInstancesArgs = z.infer<
  ReturnType<typeof z.object<typeof listDBInstancesSchema>>
>;
export type CreateDBInstanceArgs = z.infer<
  ReturnType<typeof z.object<typeof createDBInstanceSchema>>
>;
export type DeleteDBInstanceArgs = z.infer<
  ReturnType<typeof z.object<typeof deleteDBInstanceSchema>>
>;
export type UpdateDBInstanceArgs = z.infer<
  ReturnType<typeof z.object<typeof updateDBInstanceSchema>>
>;

// Export schemas
export const listDBInstancesSchema = {
  region: regionSchema,
  DBInstanceArgs: describeDBInstancesBaseSchema,
};

export const createDBInstanceSchema = {
  region: regionSchema,
  DBInstanceArgs: createDBInstanceBaseSchema,
};

export const deleteDBInstanceSchema = {
  region: regionSchema,
  DBInstanceArgs: deleteDBInstanceBaseSchema,
};

export const updateDBInstanceSchema = {
  region: regionSchema,
  DBInstanceArgs: updateDBInstanceBaseSchema,
};
