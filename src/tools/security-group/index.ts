import { listSecurityGroupsSchema } from "@/schema/security-group";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp";
import { listSecurityGroups } from "./handler";

export const registerSecurityGroupTools = (server: McpServer): void => {
  server.tool(
    "security-group-list-security-groups",
    "List all security groups in the given region",
    listSecurityGroupsSchema,
    {
      destructiveHint: false,
      openWorldHint: true,
      readOnlyHint: true,
      idempotentHint: true,
      title: "List Security Groups",
    },
    async (args) => await listSecurityGroups(args)
  );
};
