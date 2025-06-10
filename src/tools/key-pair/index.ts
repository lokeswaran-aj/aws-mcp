import { createKeyPairSchema, listKeyPairsSchema } from "@/schema/key-pair";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp";
import { createKeyPair, listKeyPairs } from "./handler";

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

  server.tool(
    "key-pair-create-key-pair",
    "Create a key pair in the given region",
    createKeyPairSchema,
    {
      destructiveHint: false,
      openWorldHint: true,
      readOnlyHint: false,
      idempotentHint: false,
      title: "Create Key Pair",
    },
    async (args) => await createKeyPair(args)
  );
};
