import { CONSTANTS } from "@/config/constants";
import { ResourceType, VolumeType } from "@aws-sdk/client-ec2";
import { z } from "zod";

export const regionSchema = z
  .string()
  .default(CONSTANTS.REGION)
  .describe("The AWS region");

export const paginationSchema = {
  NextToken: z
    .string()
    .optional()
    .describe("The token returned from a previous paginated request"),
  MaxResults: z
    .number()
    .optional()
    .describe("The maximum number of items to return for this request"),
};

export const filterSchema = z
  .array(
    z.object({
      Name: z.string().describe("The name of the filter"),
      Values: z.array(z.string()).describe("The values of the filter"),
    })
  )
  .optional()
  .describe("The filters for the request");

export const dryRunSchema = z
  .boolean()
  .optional()
  .describe(
    "Checks whether you have the required permissions for the action, without actually making the request"
  );

export const tagSpecificationSchema = z
  .array(
    z.object({
      ResourceType: z
        .nativeEnum(ResourceType)
        .optional()
        .describe("The type of resource to tag"),
      Tags: z
        .array(
          z.object({
            Key: z.string().max(127).describe("The key of the tag"),
            Value: z.string().max(256).describe("The value of the tag"),
          })
        )
        .optional()
        .describe("The tags to apply to the resource"),
    })
  )
  .optional()
  .describe("The tags to assign to the resource");

export const blockDeviceMappingSchema = z
  .array(
    z.object({
      DeviceName: z.string(),
      Ebs: z
        .object({
          DeleteOnTermination: z.boolean().optional(),
          Iops: z.number().optional(),
          SnapshotId: z.string().optional(),
          VolumeSize: z.number().optional(),
          VolumeType: z.nativeEnum(VolumeType).optional(),
          Encrypted: z.boolean().optional(),
        })
        .optional(),
      NoDevice: z.string().optional(),
      VirtualName: z.string().optional(),
    })
  )
  .optional()
  .describe("The block device mapping entries");
