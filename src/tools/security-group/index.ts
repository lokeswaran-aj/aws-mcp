import {
  authorizeSecurityGroupEgressSchema,
  authorizeSecurityGroupIngressSchema,
  createSecurityGroupSchema,
  deleteSecurityGroupSchema,
  listSecurityGroupRulesSchema,
  listSecurityGroupsSchema,
  modifySecurityGroupRulesSchema,
  revokeSecurityGroupEgressSchema,
  revokeSecurityGroupIngressSchema,
  updateSecurityGroupRuleDescriptionsEgressSchema,
  updateSecurityGroupRuleDescriptionsIngressSchema,
} from "@/schema/security-group";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp";
import {
  authorizeSecurityGroupEgress,
  authorizeSecurityGroupIngress,
  createSecurityGroup,
  deleteSecurityGroup,
  listSecurityGroupRules,
  listSecurityGroups,
  modifySecurityGroupRules,
  revokeSecurityGroupEgress,
  revokeSecurityGroupIngress,
  updateSecurityGroupRuleDescriptionsEgress,
  updateSecurityGroupRuleDescriptionsIngress,
} from "./handler";

export const registerSecurityGroupTools = (server: McpServer): void => {
  server.tool(
    "list-security-groups",
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
    "list-security-group-rules",
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
    "create-security-group",
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
    "authorize-security-group-ingress",
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
    "authorize-security-group-egress",
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

  server.tool(
    "modify-security-group-rules",
    "Modify a security group rule in the given region",
    modifySecurityGroupRulesSchema,
    {
      destructiveHint: false,
      openWorldHint: true,
      readOnlyHint: false,
      idempotentHint: true,
      title: "Modify Security Group Rules",
    },
    async (args) => await modifySecurityGroupRules(args)
  );

  server.tool(
    "update-security-group-rule-descriptions-ingress",
    "Update the description of a security group rule ingress in the given region",
    updateSecurityGroupRuleDescriptionsIngressSchema,
    {
      destructiveHint: false,
      openWorldHint: true,
      readOnlyHint: false,
      idempotentHint: true,
      title: "Update Security Group Rule Descriptions Ingress",
    },
    async (args) => await updateSecurityGroupRuleDescriptionsIngress(args)
  );

  server.tool(
    "update-security-group-rule-descriptions-egress",
    "Update the description of a security group rule egress in the given region",
    updateSecurityGroupRuleDescriptionsEgressSchema,
    {
      destructiveHint: false,
      openWorldHint: true,
      readOnlyHint: false,
      idempotentHint: true,
      title: "Update Security Group Rule Descriptions Egress",
    },
    async (args) => await updateSecurityGroupRuleDescriptionsEgress(args)
  );

  server.tool(
    "revoke-security-group-ingress",
    "Revoke a security group ingress in the given region",
    revokeSecurityGroupIngressSchema,
    {
      destructiveHint: true,
      openWorldHint: true,
      readOnlyHint: false,
      idempotentHint: true,
      title: "Revoke Security Group Ingress",
    },
    async (args) => await revokeSecurityGroupIngress(args)
  );

  server.tool(
    "revoke-security-group-egress",
    "Revoke a security group egress in the given region",
    revokeSecurityGroupEgressSchema,
    {
      destructiveHint: true,
      openWorldHint: true,
      readOnlyHint: false,
      idempotentHint: true,
      title: "Revoke Security Group Egress",
    },
    async (args) => await revokeSecurityGroupEgress(args)
  );

  server.tool(
    "delete-security-group",
    "Delete a security group in the given region",
    deleteSecurityGroupSchema,
    {
      destructiveHint: true,
      openWorldHint: true,
      readOnlyHint: false,
      idempotentHint: true,
      title: "Delete Security Group",
    },
    async (args) => await deleteSecurityGroup(args)
  );
};
