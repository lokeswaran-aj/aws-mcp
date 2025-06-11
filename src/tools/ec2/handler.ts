import { getEC2Client } from "@/aws-clients";
import { HandlerReturnType } from "@/types/common";
import { formatResponse } from "@/utils/format-response";
import { DescribeInstancesCommand } from "@aws-sdk/client-ec2";
import { ListEc2InstancesArgs } from "../../schema/ec2";

export const listEc2Instances = async (
  args: ListEc2InstancesArgs
): Promise<HandlerReturnType> => {
  const { region, Ec2Args } = args;
  const ec2 = getEC2Client({ region });
  const command = new DescribeInstancesCommand(Ec2Args);
  const response = await ec2.send(command);
  return formatResponse(response);
};
