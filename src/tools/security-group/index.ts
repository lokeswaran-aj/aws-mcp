import {
  createSecurityGroupSchema,
  listSecurityGroupRulesSchema,
  listSecurityGroupsSchema,
} from "@/schema/security-group";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp";
import {
  createSecurityGroup,
  listSecurityGroupRules,
  listSecurityGroups,
} from "./handler";

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

  server.tool(
    "security-group-list-security-group-rules",
    "List all security group rules in the given region",
    listSecurityGroupRulesSchema,
    {
      destructiveHint: false,
      openWorldHint: true,
      readOnlyHint: true,
      idempotentHint: true,
      title: "List Security Group Rules",
    },
    async (args) => await listSecurityGroupRules(args)
  );

  server.tool(
    "security-group-create-security-group",
    "Create a security group in the given region",
    createSecurityGroupSchema,
    {
      destructiveHint: false,
      openWorldHint: true,
      readOnlyHint: false,
      idempotentHint: false,
      title: "Create Security Group",
    },
    async (args) => await createSecurityGroup(args)
  );
};
