import { getEC2Client } from "@/aws-clients";
import { ListSubnetsArgs } from "@/schema/subnet";
import { HandlerReturnType } from "@/types/common";
import { formatResponse } from "@/utils/format-response";
import { DescribeSubnetsCommand } from "@aws-sdk/client-ec2";

export const listSubnets = async (
  input: ListSubnetsArgs
): Promise<HandlerReturnType> => {
  const ec2Client = getEC2Client({ region: input.region });
  const command = new DescribeSubnetsCommand(input.SubnetArgs);
  const response = await ec2Client.send(command);
  return formatResponse(response);
};
