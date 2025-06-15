import { getEC2Client } from "@/aws-clients";
import {
  CreateKeyPairArgs,
  DeleteKeyPairArgs,
  ImportKeyPairArgs,
  ListKeyPairsArgs,
} from "@/schema/key-pair";
import { SessionData } from "@/server";
import { HandlerReturnType } from "@/types/common";
import { formatResponse } from "@/utils/format-response";
import {
  CreateKeyPairCommand,
  DeleteKeyPairCommand,
  DescribeKeyPairsCommand,
  ImportKeyPairCommand,
} from "@aws-sdk/client-ec2";
import { Context } from "fastmcp";

export const listKeyPairs = async (
  args: ListKeyPairsArgs,
  context: Context<SessionData>
): Promise<HandlerReturnType> => {
  const { region, KeyPairArgs } = args;
  const ec2Client = getEC2Client({
    region,
    credentials: context.session?.credentials,
  });
  const command = new DescribeKeyPairsCommand(KeyPairArgs);
  const response = await ec2Client.send(command);
  return formatResponse(response);
};

export const createKeyPair = async (
  args: CreateKeyPairArgs,
  context: Context<SessionData>
): Promise<HandlerReturnType> => {
  const { region, KeyPairArgs } = args;
  const ec2Client = getEC2Client({
    region,
    credentials: context.session?.credentials,
  });
  const command = new CreateKeyPairCommand(KeyPairArgs);
  const response = await ec2Client.send(command);
  return formatResponse(response);
};

export const importKeyPair = async (
  args: ImportKeyPairArgs,
  context: Context<SessionData>
): Promise<HandlerReturnType> => {
  const { region, KeyPairArgs } = args;
  const ec2Client = getEC2Client({
    region,
    credentials: context.session?.credentials,
  });
  const command = new ImportKeyPairCommand(KeyPairArgs);
  const response = await ec2Client.send(command);
  return formatResponse(response);
};

export const deleteKeyPair = async (
  args: DeleteKeyPairArgs,
  context: Context<SessionData>
): Promise<HandlerReturnType> => {
  const { region, KeyPairArgs } = args;
  const ec2Client = getEC2Client({
    region,
    credentials: context.session?.credentials,
  });
  const command = new DeleteKeyPairCommand(KeyPairArgs);
  const response = await ec2Client.send(command);
  return formatResponse(response);
};
