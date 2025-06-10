import { DEFAULT_CONFIG } from "@/config/defaults";
import { z } from "zod";

export const regionSchema = z
  .string()
  .default(DEFAULT_CONFIG.REGION)
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
