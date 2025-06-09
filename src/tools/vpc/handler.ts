import { getEC2Client } from "@/aws-clients";
import { ListVpcsArgs } from "@/schema/vpc";
import { HandlerReturnType } from "@/types/common";
import { formatResponse } from "@/utils/format-response";
import { DescribeVpcsCommand } from "@aws-sdk/client-ec2";

export const listVpcs = async (
  input: ListVpcsArgs
): Promise<HandlerReturnType> => {
  const ec2Client = getEC2Client({ region: input.region });
  const command = new DescribeVpcsCommand(input.VpcArgs);
  const response = await ec2Client.send(command);
  return formatResponse(response);
};
