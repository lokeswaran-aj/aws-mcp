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
import { server } from "@/server";
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

export const registerSecurityGroupTools = (): void => {
  server.addTool({
    name: "list-security-groups",
    description: "List all security groups in the given region",
    parameters: listSecurityGroupsSchema,
    annotations: {
      destructiveHint: false,
      openWorldHint: true,
      readOnlyHint: true,
      idempotentHint: true,
      title: "List Security Groups",
    },
    execute: async (args, context) => await listSecurityGroups(args, context),
  });

  server.addTool({
    name: "list-security-group-rules",
    description: "List all security group rules in the given region",
    parameters: listSecurityGroupRulesSchema,
    annotations: {
      destructiveHint: false,
      openWorldHint: true,
      readOnlyHint: true,
      idempotentHint: true,
      title: "List Security Group Rules",
    },
    execute: async (args, context) =>
      await listSecurityGroupRules(args, context),
  });

  server.addTool({
    name: "create-security-group",
    description: "Create a security group in the given region",
    parameters: createSecurityGroupSchema,
    annotations: {
      destructiveHint: false,
      openWorldHint: true,
      readOnlyHint: false,
      idempotentHint: false,
      title: "Create Security Group",
    },
    execute: async (args, context) => await createSecurityGroup(args, context),
  });

  server.addTool({
    name: "authorize-security-group-ingress",
    description: "Authorize a security group ingress in the given region",
    parameters: authorizeSecurityGroupIngressSchema,
    annotations: {
      destructiveHint: false,
      openWorldHint: true,
      readOnlyHint: false,
      idempotentHint: false,
      title: "Authorize Security Group Ingress",
    },
    execute: async (args, context) =>
      await authorizeSecurityGroupIngress(args, context),
  });

  server.addTool({
    name: "authorize-security-group-egress",
    description: "Authorize a security group egress in the given region",
    parameters: authorizeSecurityGroupEgressSchema,
    annotations: {
      destructiveHint: false,
      openWorldHint: true,
      readOnlyHint: false,
      idempotentHint: false,
      title: "Authorize Security Group Egress",
    },
    execute: async (args, context) =>
      await authorizeSecurityGroupEgress(args, context),
  });

  server.addTool({
    name: "modify-security-group-rules",
    description: "Modify a security group rule in the given region",
    parameters: modifySecurityGroupRulesSchema,
    annotations: {
      destructiveHint: false,
      openWorldHint: true,
      readOnlyHint: false,
      idempotentHint: true,
      title: "Modify Security Group Rules",
    },
    execute: async (args, context) =>
      await modifySecurityGroupRules(args, context),
  });

  server.addTool({
    name: "update-security-group-rule-descriptions-ingress",
    description:
      "Update the description of a security group rule ingress in the given region",
    parameters: updateSecurityGroupRuleDescriptionsIngressSchema,
    annotations: {
      destructiveHint: false,
      openWorldHint: true,
      readOnlyHint: false,
      idempotentHint: true,
      title: "Update Security Group Rule Descriptions Ingress",
    },
    execute: async (args, context) =>
      await updateSecurityGroupRuleDescriptionsIngress(args, context),
  });

  server.addTool({
    name: "update-security-group-rule-descriptions-egress",
    description:
      "Update the description of a security group rule egress in the given region",
    parameters: updateSecurityGroupRuleDescriptionsEgressSchema,
    annotations: {
      destructiveHint: false,
      openWorldHint: true,
      readOnlyHint: false,
      idempotentHint: true,
      title: "Update Security Group Rule Descriptions Egress",
    },
    execute: async (args, context) =>
      await updateSecurityGroupRuleDescriptionsEgress(args, context),
  });

  server.addTool({
    name: "revoke-security-group-ingress",
    description: "Revoke a security group ingress in the given region",
    parameters: revokeSecurityGroupIngressSchema,
    annotations: {
      destructiveHint: true,
      openWorldHint: true,
      readOnlyHint: false,
      idempotentHint: true,
      title: "Revoke Security Group Ingress",
    },
    execute: async (args, context) =>
      await revokeSecurityGroupIngress(args, context),
  });

  server.addTool({
    name: "revoke-security-group-egress",
    description: "Revoke a security group egress in the given region",
    parameters: revokeSecurityGroupEgressSchema,
    annotations: {
      destructiveHint: true,
      openWorldHint: true,
      readOnlyHint: false,
      idempotentHint: true,
      title: "Revoke Security Group Egress",
    },
    execute: async (args, context) =>
      await revokeSecurityGroupEgress(args, context),
  });

  server.addTool({
    name: "delete-security-group",
    description: "Delete a security group in the given region",
    parameters: deleteSecurityGroupSchema,
    annotations: {
      destructiveHint: true,
      openWorldHint: true,
      readOnlyHint: false,
      idempotentHint: true,
      title: "Delete Security Group",
    },
    execute: async (args, context) => await deleteSecurityGroup(args, context),
  });
};
