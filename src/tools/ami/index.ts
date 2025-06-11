import { createAmiSchema, deleteAmiSchema, listAmisSchema } from "@/schema/ami";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp";
import { createAmi, deleteAmi, listAmis } from "./handler";

export const registerAmiTools = (server: McpServer): void => {
  server.tool(
    "list-amis",
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

  server.tool(
    "create-ami",
    "Create an AMI",
    createAmiSchema,
    {
      title: "Create AMI",
      destructiveHint: false,
      idempotentHint: false,
      readOnlyHint: false,
    },
    async (args) => createAmi(args)
  );

  server.tool(
    "delete-ami",
    "Delete an AMI",
    deleteAmiSchema,
    {
      title: "Delete AMI",
      destructiveHint: true,
      idempotentHint: true,
      readOnlyHint: false,
    },
    async (args) => deleteAmi(args)
  );
};
