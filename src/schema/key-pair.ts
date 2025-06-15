import {
  CreateKeyPairCommandInput,
  DeleteKeyPairCommandInput,
  DescribeKeyPairsCommandInput,
  ImportKeyPairCommandInput,
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
  KeyNames: z
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

// Import Key Pair
const importKeyPairBaseSchema = z.object({
  KeyName: z.string().describe("The name of the key pair"),
  PublicKeyMaterial: z.string().describe("The public key material"),
  TagSpecifications: tagSpecificationSchema,
  DryRun: dryRunSchema,
}) as unknown as z.ZodType<ImportKeyPairCommandInput>;

// Delete Key Pair
const deleteKeyPairBaseSchema = z.object({
  KeyPairId: z.string().optional().describe("The ID of the key pair"),
  KeyName: z.string().optional().describe("The name of the key pair"),
  DryRun: dryRunSchema,
}) satisfies z.ZodType<DeleteKeyPairCommandInput>;

// Export Schemas
export const listKeyPairsSchema = z.object({
  region: regionSchema,
  KeyPairArgs: listKeyPairsBaseSchema,
});

export const createKeyPairSchema = z.object({
  region: regionSchema,
  KeyPairArgs: createKeyPairBaseSchema,
});

export const importKeyPairSchema = z.object({
  region: regionSchema,
  KeyPairArgs: importKeyPairBaseSchema,
});

export const deleteKeyPairSchema = z.object({
  region: regionSchema,
  KeyPairArgs: deleteKeyPairBaseSchema,
});

// Export Types
export type ListKeyPairsArgs = z.infer<typeof listKeyPairsSchema>;

export type CreateKeyPairArgs = z.infer<typeof createKeyPairSchema>;

export type ImportKeyPairArgs = z.infer<typeof importKeyPairSchema>;

export type DeleteKeyPairArgs = z.infer<typeof deleteKeyPairSchema>;
