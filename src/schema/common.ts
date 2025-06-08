import { z } from "zod";

export const regionSchema = z.string().describe("The AWS region");
