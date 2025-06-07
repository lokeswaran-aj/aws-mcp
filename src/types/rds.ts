import { DEFAULT_CONFIG } from "@/config/defaults";
import { z } from "zod";

export const RdsListInstancesSchema = {
  region: z
    .string()
    .describe("The region to list RDS DB instances in")
    .default(DEFAULT_CONFIG.REGION),
} as const;

export type RdsListInstancesArgs = {
  region: string;
};
