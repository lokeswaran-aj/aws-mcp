import { DescribeKeyPairsCommandInput } from "@aws-sdk/client-ec2";
import { z } from "zod";
import { dryRunSchema, filterSchema, regionSchema } from "./common";

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

// Export Schemas
export const listKeyPairsSchema = {
  region: regionSchema,
  KeyPairArgs: listKeyPairsBaseSchema,
};

// Export Types
export type ListKeyPairsArgs = z.infer<
  ReturnType<typeof z.object<typeof listKeyPairsSchema>>
>;
