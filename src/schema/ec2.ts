import {
  _InstanceType,
  DescribeInstancesCommandInput,
  RebootInstancesCommandInput,
  RunInstancesCommandInput,
  ShutdownBehavior,
  StartInstancesCommandInput,
  StopInstancesCommandInput,
  TerminateInstancesCommandInput,
} from "@aws-sdk/client-ec2";
import { z } from "zod";
import {
  blockDeviceMappingSchema,
  dryRunSchema,
  filterSchema,
  paginationSchema,
  regionSchema,
} from "./common";

// List EC2 instances
const listEc2InstancesBaseSchema = z.object({
  Filters: filterSchema,
  DryRun: dryRunSchema,
  ...paginationSchema,
  InstanceIds: z
    .array(z.string())
    .optional()
    .describe("The IDs of the instances"),
}) satisfies z.ZodType<DescribeInstancesCommandInput>;

// Launch EC2 instance
const launchEc2InstanceBaseSchema = z.object({
  ImageId: z
    .string()
    .optional()
    .describe("The ID of the AMI to use for the instance"),
  InstanceType: z
    .nativeEnum(_InstanceType)
    .optional()
    .describe("The type of instance to launch"),
  KeyName: z
    .string()
    .optional()
    .describe("The name of the key pair to use for the instance"),
  MaxCount: z.number().describe("The maximum number of instances to launch"),
  MinCount: z.number().describe("The minimum number of instances to launch"),
  BlockDeviceMappings: blockDeviceMappingSchema,
  ClientToken: z
    .string()
    .optional()
    .describe(
      "Unique, case-sensitive identifier you provide to ensure idempotency"
    ),
  EbsOptimized: z
    .boolean()
    .optional()
    .describe("Indicates whether the instance is optimized for Amazon EBS I/O"),
  IamInstanceProfile: z
    .object({
      Arn: z.string().optional(),
      Name: z.string().optional(),
    })
    .optional()
    .describe("The IAM instance profile"),
  InstanceInitiatedShutdownBehavior: z
    .nativeEnum(ShutdownBehavior)
    .optional()
    .describe(
      "Indicates whether an instance stops or terminates when you initiate shutdown from the instance"
    ),
  NetworkInterfaces: z
    .array(
      z.object({
        AssociatePublicIpAddress: z.boolean().optional(),
        DeleteOnTermination: z.boolean().optional(),
        Description: z.string().optional(),
        DeviceIndex: z.number(),
        Groups: z.array(z.string()).optional(),
        NetworkInterfaceId: z.string().optional(),
        PrivateIpAddress: z.string().optional(),
        SubnetId: z.string().optional(),
      })
    )
    .optional()
    .describe("The network interfaces to associate with the instance"),
  Placement: z
    .object({
      AvailabilityZone: z.string().optional(),
      GroupName: z.string().optional(),
      Tenancy: z.enum(["default", "dedicated", "host"]).optional(),
    })
    .optional()
    .describe("The placement for the instance"),
  SecurityGroupIds: z
    .array(z.string())
    .optional()
    .describe("The IDs of the security groups to associate with the instance"),
  SecurityGroups: z
    .array(z.string())
    .optional()
    .describe(
      "The names of the security groups to associate with the instance"
    ),
  SubnetId: z
    .string()
    .optional()
    .describe("The ID of the subnet to launch the instance into"),
  TagSpecifications: z
    .array(
      z.object({
        ResourceType: z.enum(["instance", "volume", "network-interface"]),
        Tags: z.array(
          z.object({
            Key: z.string(),
            Value: z.string(),
          })
        ),
      })
    )
    .optional()
    .describe("The tags to apply to the resources during launch"),
  UserData: z
    .string()
    .optional()
    .describe("The user data to make available to the instance"),
  DryRun: dryRunSchema,
}) satisfies z.ZodType<RunInstancesCommandInput>;

// Stop EC2 instance
const stopEc2InstanceBaseSchema = z.object({
  InstanceIds: z.array(z.string()).describe("The IDs of the instances to stop"),
  Force: z.boolean().optional().describe("Forces the instances to stop"),
  Hibernate: z.boolean().optional().describe("Hibernates the instances"),
  DryRun: dryRunSchema,
}) satisfies z.ZodType<StopInstancesCommandInput>;

// Start EC2 instance
const startEc2InstanceBaseSchema = z.object({
  InstanceIds: z
    .array(z.string())
    .describe("The IDs of the instances to start"),
  DryRun: dryRunSchema,
}) satisfies z.ZodType<StartInstancesCommandInput>;

// Reboot EC2 instance
const rebootEc2InstanceBaseSchema = z.object({
  InstanceIds: z
    .array(z.string())
    .describe("The IDs of the instances to reboot"),
  DryRun: dryRunSchema,
}) satisfies z.ZodType<RebootInstancesCommandInput>;

// Terminate EC2 instance
const terminateEc2InstanceBaseSchema = z.object({
  InstanceIds: z
    .array(z.string())
    .describe("The IDs of the instances to terminate"),
  DryRun: dryRunSchema,
}) satisfies z.ZodType<TerminateInstancesCommandInput>;

// Export the schemas
export const listEc2InstancesSchema = {
  region: regionSchema,
  Ec2Args: listEc2InstancesBaseSchema,
};

export const launchEc2InstanceSchema = {
  region: regionSchema,
  Ec2Args: launchEc2InstanceBaseSchema,
};

export const stopEc2InstanceSchema = {
  region: regionSchema,
  Ec2Args: stopEc2InstanceBaseSchema,
};

export const startEc2InstanceSchema = {
  region: regionSchema,
  Ec2Args: startEc2InstanceBaseSchema,
};

export const rebootEc2InstanceSchema = {
  region: regionSchema,
  Ec2Args: rebootEc2InstanceBaseSchema,
};

export const terminateEc2InstanceSchema = {
  region: regionSchema,
  Ec2Args: terminateEc2InstanceBaseSchema,
};

// Export the types
export type ListEc2InstancesArgs = z.infer<
  ReturnType<typeof z.object<typeof listEc2InstancesSchema>>
>;

export type LaunchEc2InstanceArgs = z.infer<
  ReturnType<typeof z.object<typeof launchEc2InstanceSchema>>
>;

export type StopEc2InstanceArgs = z.infer<
  ReturnType<typeof z.object<typeof stopEc2InstanceSchema>>
>;

export type StartEc2InstanceArgs = z.infer<
  ReturnType<typeof z.object<typeof startEc2InstanceSchema>>
>;

export type RebootEc2InstanceArgs = z.infer<
  ReturnType<typeof z.object<typeof rebootEc2InstanceSchema>>
>;

export type TerminateEc2InstanceArgs = z.infer<
  ReturnType<typeof z.object<typeof terminateEc2InstanceSchema>>
>;
