import { getEC2Client } from "@/aws-clients";
import {
  AuthorizeSecurityGroupEgressArgs,
  AuthorizeSecurityGroupIngressArgs,
  CreateSecurityGroupArgs,
  DeleteSecurityGroupArgs,
  ListSecurityGroupRulesArgs,
  ListSecurityGroupsArgs,
  ModifySecurityGroupRulesArgs,
  RevokeSecurityGroupEgressArgs,
  RevokeSecurityGroupIngressArgs,
  UpdateSecurityGroupRuleDescriptionsEgressArgs,
  UpdateSecurityGroupRuleDescriptionsIngressArgs,
} from "@/schema/security-group";
import { SessionData } from "@/server";
import { HandlerReturnType } from "@/types/common";
import { formatResponse } from "@/utils/format-response";
import {
  AuthorizeSecurityGroupEgressCommand,
  AuthorizeSecurityGroupIngressCommand,
  CreateSecurityGroupCommand,
  DeleteSecurityGroupCommand,
  DescribeSecurityGroupRulesCommand,
  DescribeSecurityGroupsCommand,
  ModifySecurityGroupRulesCommand,
  RevokeSecurityGroupEgressCommand,
  RevokeSecurityGroupIngressCommand,
  UpdateSecurityGroupRuleDescriptionsEgressCommand,
  UpdateSecurityGroupRuleDescriptionsIngressCommand,
} from "@aws-sdk/client-ec2";
import { Context } from "fastmcp";

export const listSecurityGroups = async (
  args: ListSecurityGroupsArgs,
  context: Context<SessionData>
): Promise<HandlerReturnType> => {
  const { region, SecurityGroupArgs } = args;
  const ec2Client = getEC2Client({
    region,
    credentials: context.session?.credentials,
  });
  const command = new DescribeSecurityGroupsCommand(SecurityGroupArgs);
  const response = await ec2Client.send(command);
  return formatResponse(response);
};

export const listSecurityGroupRules = async (
  args: ListSecurityGroupRulesArgs,
  context: Context<SessionData>
): Promise<HandlerReturnType> => {
  const { region, SecurityGroupRuleArgs } = args;
  const ec2Client = getEC2Client({
    region,
    credentials: context.session?.credentials,
  });
  const command = new DescribeSecurityGroupRulesCommand(SecurityGroupRuleArgs);
  const response = await ec2Client.send(command);
  return formatResponse(response);
};

export const createSecurityGroup = async (
  args: CreateSecurityGroupArgs,
  context: Context<SessionData>
): Promise<HandlerReturnType> => {
  const { region, SecurityGroupArgs } = args;
  const ec2Client = getEC2Client({
    region,
    credentials: context.session?.credentials,
  });
  const command = new CreateSecurityGroupCommand(SecurityGroupArgs);
  const response = await ec2Client.send(command);
  return formatResponse(response);
};

export const authorizeSecurityGroupIngress = async (
  args: AuthorizeSecurityGroupIngressArgs,
  context: Context<SessionData>
): Promise<HandlerReturnType> => {
  const { region, SecurityGroupArgs } = args;
  const ec2Client = getEC2Client({
    region,
    credentials: context.session?.credentials,
  });
  const command = new AuthorizeSecurityGroupIngressCommand(SecurityGroupArgs);
  const response = await ec2Client.send(command);
  return formatResponse(response);
};

export const authorizeSecurityGroupEgress = async (
  args: AuthorizeSecurityGroupEgressArgs,
  context: Context<SessionData>
): Promise<HandlerReturnType> => {
  const { region, SecurityGroupArgs } = args;
  const ec2Client = getEC2Client({
    region,
    credentials: context.session?.credentials,
  });
  const command = new AuthorizeSecurityGroupEgressCommand(SecurityGroupArgs);
  const response = await ec2Client.send(command);
  return formatResponse(response);
};

export const modifySecurityGroupRules = async (
  args: ModifySecurityGroupRulesArgs,
  context: Context<SessionData>
): Promise<HandlerReturnType> => {
  const { region, SecurityGroupArgs } = args;
  const ec2Client = getEC2Client({
    region,
    credentials: context.session?.credentials,
  });
  const command = new ModifySecurityGroupRulesCommand(SecurityGroupArgs);
  const response = await ec2Client.send(command);
  return formatResponse(response);
};

export const updateSecurityGroupRuleDescriptionsIngress = async (
  args: UpdateSecurityGroupRuleDescriptionsIngressArgs,
  context: Context<SessionData>
): Promise<HandlerReturnType> => {
  const { region, SecurityGroupArgs } = args;
  const ec2Client = getEC2Client({
    region,
    credentials: context.session?.credentials,
  });
  const command = new UpdateSecurityGroupRuleDescriptionsIngressCommand(
    SecurityGroupArgs
  );
  const response = await ec2Client.send(command);
  return formatResponse(response);
};

export const updateSecurityGroupRuleDescriptionsEgress = async (
  args: UpdateSecurityGroupRuleDescriptionsEgressArgs,
  context: Context<SessionData>
): Promise<HandlerReturnType> => {
  const { region, SecurityGroupArgs } = args;
  const ec2Client = getEC2Client({
    region,
    credentials: context.session?.credentials,
  });
  const command = new UpdateSecurityGroupRuleDescriptionsEgressCommand(
    SecurityGroupArgs
  );
  const response = await ec2Client.send(command);
  return formatResponse(response);
};

export const revokeSecurityGroupIngress = async (
  args: RevokeSecurityGroupIngressArgs,
  context: Context<SessionData>
): Promise<HandlerReturnType> => {
  const { region, SecurityGroupArgs } = args;
  const ec2Client = getEC2Client({
    region,
    credentials: context.session?.credentials,
  });
  const command = new RevokeSecurityGroupIngressCommand(SecurityGroupArgs);
  const response = await ec2Client.send(command);
  return formatResponse(response);
};

export const revokeSecurityGroupEgress = async (
  args: RevokeSecurityGroupEgressArgs,
  context: Context<SessionData>
): Promise<HandlerReturnType> => {
  const { region, SecurityGroupArgs } = args;
  const ec2Client = getEC2Client({
    region,
    credentials: context.session?.credentials,
  });
  const command = new RevokeSecurityGroupEgressCommand(SecurityGroupArgs);
  const response = await ec2Client.send(command);
  return formatResponse(response);
};

export const deleteSecurityGroup = async (
  args: DeleteSecurityGroupArgs,
  context: Context<SessionData>
): Promise<HandlerReturnType> => {
  const { region, SecurityGroupArgs } = args;
  const ec2Client = getEC2Client({
    region,
    credentials: context.session?.credentials,
  });
  const command = new DeleteSecurityGroupCommand(SecurityGroupArgs);
  const response = await ec2Client.send(command);
  return formatResponse(response);
};
