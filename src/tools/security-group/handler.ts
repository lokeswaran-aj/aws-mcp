import { getEC2Client } from "@/aws-clients";
import {
  AuthorizeSecurityGroupEgressArgs,
  AuthorizeSecurityGroupIngressArgs,
  CreateSecurityGroupArgs,
  ListSecurityGroupRulesArgs,
  ListSecurityGroupsArgs,
  ModifySecurityGroupRulesArgs,
  UpdateSecurityGroupRuleDescriptionsEgressArgs,
  UpdateSecurityGroupRuleDescriptionsIngressArgs,
} from "@/schema/security-group";
import { HandlerReturnType } from "@/types/common";
import { formatResponse } from "@/utils/format-response";
import {
  AuthorizeSecurityGroupEgressCommand,
  AuthorizeSecurityGroupIngressCommand,
  CreateSecurityGroupCommand,
  DescribeSecurityGroupRulesCommand,
  DescribeSecurityGroupsCommand,
  ModifySecurityGroupRulesCommand,
  UpdateSecurityGroupRuleDescriptionsEgressCommand,
  UpdateSecurityGroupRuleDescriptionsIngressCommand,
} from "@aws-sdk/client-ec2";

export const listSecurityGroups = async (
  args: ListSecurityGroupsArgs
): Promise<HandlerReturnType> => {
  const { region, SecurityGroupArgs } = args;
  const ec2Client = getEC2Client({ region });
  const command = new DescribeSecurityGroupsCommand(SecurityGroupArgs);
  const response = await ec2Client.send(command);
  return formatResponse(response);
};

export const listSecurityGroupRules = async (
  args: ListSecurityGroupRulesArgs
): Promise<HandlerReturnType> => {
  const { region, SecurityGroupRuleArgs } = args;
  const ec2Client = getEC2Client({ region });
  const command = new DescribeSecurityGroupRulesCommand(SecurityGroupRuleArgs);
  const response = await ec2Client.send(command);
  return formatResponse(response);
};

export const createSecurityGroup = async (
  args: CreateSecurityGroupArgs
): Promise<HandlerReturnType> => {
  const { region, SecurityGroupArgs } = args;
  const ec2Client = getEC2Client({ region });
  const command = new CreateSecurityGroupCommand(SecurityGroupArgs);
  const response = await ec2Client.send(command);
  return formatResponse(response);
};

export const authorizeSecurityGroupIngress = async (
  args: AuthorizeSecurityGroupIngressArgs
): Promise<HandlerReturnType> => {
  const { region, SecurityGroupArgs } = args;
  const ec2Client = getEC2Client({ region });
  const command = new AuthorizeSecurityGroupIngressCommand(SecurityGroupArgs);
  const response = await ec2Client.send(command);
  return formatResponse(response);
};

export const authorizeSecurityGroupEgress = async (
  args: AuthorizeSecurityGroupEgressArgs
): Promise<HandlerReturnType> => {
  const { region, SecurityGroupArgs } = args;
  const ec2Client = getEC2Client({ region });
  const command = new AuthorizeSecurityGroupEgressCommand(SecurityGroupArgs);
  const response = await ec2Client.send(command);
  return formatResponse(response);
};

export const modifySecurityGroupRules = async (
  args: ModifySecurityGroupRulesArgs
): Promise<HandlerReturnType> => {
  const { region, SecurityGroupArgs } = args;
  const ec2Client = getEC2Client({ region });
  const command = new ModifySecurityGroupRulesCommand(SecurityGroupArgs);
  const response = await ec2Client.send(command);
  return formatResponse(response);
};

export const updateSecurityGroupRuleDescriptionsIngress = async (
  args: UpdateSecurityGroupRuleDescriptionsIngressArgs
): Promise<HandlerReturnType> => {
  const { region, SecurityGroupArgs } = args;
  const ec2Client = getEC2Client({ region });
  const command = new UpdateSecurityGroupRuleDescriptionsIngressCommand(
    SecurityGroupArgs
  );
  const response = await ec2Client.send(command);
  return formatResponse(response);
};

export const updateSecurityGroupRuleDescriptionsEgress = async (
  args: UpdateSecurityGroupRuleDescriptionsEgressArgs
): Promise<HandlerReturnType> => {
  const { region, SecurityGroupArgs } = args;
  const ec2Client = getEC2Client({ region });
  const command = new UpdateSecurityGroupRuleDescriptionsEgressCommand(
    SecurityGroupArgs
  );
  const response = await ec2Client.send(command);
  return formatResponse(response);
};
