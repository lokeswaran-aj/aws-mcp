import {
  authorizeSecurityGroupEgressSchema,
  authorizeSecurityGroupIngressSchema,
  createSecurityGroupSchema,
  listSecurityGroupRulesSchema,
  listSecurityGroupsSchema,
} from "@/schema/security-group";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp";
import {
  authorizeSecurityGroupEgress,
  authorizeSecurityGroupIngress,
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

  server.tool(
    "security-group-authorize-security-group-ingress",
    "Authorize a security group ingress in the given region",
    authorizeSecurityGroupIngressSchema,
    {
      destructiveHint: false,
      openWorldHint: true,
      readOnlyHint: false,
      idempotentHint: false,
      title: "Authorize Security Group Ingress",
    },
    async (args) => await authorizeSecurityGroupIngress(args)
  );

  server.tool(
    "security-group-authorize-security-group-egress",
    "Authorize a security group egress in the given region",
    authorizeSecurityGroupEgressSchema,
    {
      destructiveHint: false,
      openWorldHint: true,
      readOnlyHint: false,
      idempotentHint: false,
      title: "Authorize Security Group Egress",
    },
    async (args) => await authorizeSecurityGroupEgress(args)
  );
};
