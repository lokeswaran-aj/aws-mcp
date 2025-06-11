import { getEC2Client } from "@/aws-clients";
import { ListAmisArgs } from "@/schema/ami";
import { HandlerReturnType } from "@/types/common";
import { formatResponse } from "@/utils/format-response";
import { DescribeImagesCommand } from "@aws-sdk/client-ec2";

export const listAmis = async (
  args: ListAmisArgs
): Promise<HandlerReturnType> => {
  const { region, AmiArgs } = args;
  const ec2 = getEC2Client({ region });
  const command = new DescribeImagesCommand(AmiArgs);
  const response = await ec2.send(command);
  return formatResponse(response);
};
