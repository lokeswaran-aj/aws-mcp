import { listKeyPairsSchema } from "@/schema/key-pair";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp";
import { listKeyPairs } from "./handler";

export const registerKeyPairTools = (server: McpServer): void => {
  server.tool(
    "key-pair-list-key-pairs",
    "List key pairs in the given region",
    listKeyPairsSchema,
    {
      destructiveHint: false,
      openWorldHint: true,
      readOnlyHint: true,
      idempotentHint: true,
      title: "List Key Pairs",
    },
    async (args) => await listKeyPairs(args)
  );
};
