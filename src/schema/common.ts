import { DEFAULT_CONFIG } from "@/config/defaults";
import { z } from "zod";

export const regionSchema = z
  .string()
  .default(DEFAULT_CONFIG.REGION)
  .describe("The AWS region");
