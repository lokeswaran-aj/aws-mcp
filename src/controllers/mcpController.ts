import { setupTransport } from "@/utils/transport";
import { Request, Response } from "express";

export const handleMcpRequest = async (
  req: Request,
  res: Response
): Promise<void> => {
  const transport = await setupTransport(res);
  await transport.handleRequest(req, res, req.body);
};
