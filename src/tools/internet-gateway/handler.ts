import { ListInternetGatewaysArgs } from "@/schema/internet-gateway";
import { HandlerReturnType } from "@/types/common";
import { formatResponse } from "@/utils/format-response";
import {
  DescribeInternetGatewaysCommand,
  EC2Client,
} from "@aws-sdk/client-ec2";

export const listInternetGateways = async (
  args: ListInternetGatewaysArgs
): Promise<HandlerReturnType> => {
  const { region, InternetGatewayArgs } = args;
  const ec2Client = new EC2Client({ region });
  const command = new DescribeInternetGatewaysCommand(InternetGatewayArgs);
  const response = await ec2Client.send(command);
  return formatResponse(response);
};
