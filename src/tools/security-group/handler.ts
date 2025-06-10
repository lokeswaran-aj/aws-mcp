import { getEC2Client } from "@/aws-clients";
import {
  CreateSecurityGroupArgs,
  ListSecurityGroupRulesArgs,
  ListSecurityGroupsArgs,
} from "@/schema/security-group";
import { HandlerReturnType } from "@/types/common";
import { formatResponse } from "@/utils/format-response";
import {
  CreateSecurityGroupCommand,
  DescribeSecurityGroupRulesCommand,
  DescribeSecurityGroupsCommand,
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
