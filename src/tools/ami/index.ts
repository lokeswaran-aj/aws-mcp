import { listAmisSchema } from "@/schema/ami";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp";
import { listAmis } from "./handler";

export const registerAmiTools = (server: McpServer): void => {
  server.tool(
    "ami-list-amis",
    "List AMIs",
    listAmisSchema,
    {
      title: "List AMIs",
      destructiveHint: false,
      idempotentHint: true,
      readOnlyHint: true,
    },
    async (args) => listAmis(args)
  );
};
