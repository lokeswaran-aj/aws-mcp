import { getEC2Client } from "@/aws-clients";
import { CreateAmiArgs, DeleteAmiArgs, ListAmisArgs } from "@/schema/ami";
import { SessionData } from "@/server";
import { HandlerReturnType } from "@/types/common";
import { formatResponse } from "@/utils/format-response";
import {
  CreateImageCommand,
  DeregisterImageCommand,
  DescribeImagesCommand,
} from "@aws-sdk/client-ec2";
import { Context } from "fastmcp";

export const listAmis = async (
  args: ListAmisArgs,
  context: Context<SessionData>
): Promise<HandlerReturnType> => {
  const { region, AmiArgs } = args;
  const ec2 = getEC2Client({
    region,
    credentials: context.session?.credentials,
  });
  const command = new DescribeImagesCommand(AmiArgs);
  const response = await ec2.send(command);
  return formatResponse(response);
};

export const createAmi = async (
  args: CreateAmiArgs,
  context: Context<SessionData>
): Promise<HandlerReturnType> => {
  const { region, AmiArgs } = args;
  const ec2 = getEC2Client({
    region,
    credentials: context.session?.credentials,
  });
  const command = new CreateImageCommand(AmiArgs);
  const response = await ec2.send(command);
  return formatResponse(response);
};

export const deleteAmi = async (
  args: DeleteAmiArgs,
  context: Context<SessionData>
): Promise<HandlerReturnType> => {
  const { region, AmiArgs } = args;
  const ec2 = getEC2Client({
    region,
    credentials: context.session?.credentials,
  });
  const command = new DeregisterImageCommand(AmiArgs);
  const response = await ec2.send(command);
  return formatResponse(response);
};
