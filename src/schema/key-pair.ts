import {
  CreateKeyPairCommandInput,
  DescribeKeyPairsCommandInput,
  KeyFormat,
  KeyType,
} from "@aws-sdk/client-ec2";
import { z } from "zod";
import {
  dryRunSchema,
  filterSchema,
  regionSchema,
  tagSpecificationSchema,
} from "./common";

// List Key Pairs
const listKeyPairsBaseSchema = z.object({
  KeyPairIds: z
    .array(z.string())
    .optional()
    .describe("The IDs of the key pairs"),
  KeyPairNames: z
    .array(z.string())
    .optional()
    .describe("The names of the key pairs"),
  IncludePublicKey: z
    .boolean()
    .optional()
    .describe("Whether to include the public key"),
  Filters: filterSchema,
  DryRun: dryRunSchema,
}) satisfies z.ZodType<DescribeKeyPairsCommandInput>;

// Create Key Pair
const createKeyPairBaseSchema = z.object({
  KeyName: z.string().describe("The name of the key pair"),
  DryRun: dryRunSchema,
  KeyType: z
    .nativeEnum(KeyType)
    .optional()
    .describe("The type of the key pair"),
  KeyFormat: z
    .nativeEnum(KeyFormat)
    .optional()
    .describe("The format of the key pair"),
  TagSpecifications: tagSpecificationSchema,
}) satisfies z.ZodType<CreateKeyPairCommandInput>;

// Export Schemas
export const listKeyPairsSchema = {
  region: regionSchema,
  KeyPairArgs: listKeyPairsBaseSchema,
};

export const createKeyPairSchema = {
  region: regionSchema,
  KeyPairArgs: createKeyPairBaseSchema,
};

// Export Types
export type ListKeyPairsArgs = z.infer<
  ReturnType<typeof z.object<typeof listKeyPairsSchema>>
>;

export type CreateKeyPairArgs = z.infer<
  ReturnType<typeof z.object<typeof createKeyPairSchema>>
>;
