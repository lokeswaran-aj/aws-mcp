import { getEC2Client } from "@/aws-clients";
import { CreateKeyPairArgs, ListKeyPairsArgs } from "@/schema/key-pair";
import { HandlerReturnType } from "@/types/common";
import { formatResponse } from "@/utils/format-response";
import {
  CreateKeyPairCommand,
  DescribeKeyPairsCommand,
} from "@aws-sdk/client-ec2";

export const listKeyPairs = async (
  args: ListKeyPairsArgs
): Promise<HandlerReturnType> => {
  const { region, KeyPairArgs } = args;
  const ec2Client = getEC2Client({ region });
  const command = new DescribeKeyPairsCommand(KeyPairArgs);
  const response = await ec2Client.send(command);
  return formatResponse(response);
};

export const createKeyPair = async (
  args: CreateKeyPairArgs
): Promise<HandlerReturnType> => {
  const { region, KeyPairArgs } = args;
  const ec2Client = getEC2Client({ region });
  const command = new CreateKeyPairCommand(KeyPairArgs);
  const response = await ec2Client.send(command);
  return formatResponse(response);
};
