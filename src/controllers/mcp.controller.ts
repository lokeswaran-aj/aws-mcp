import { transportService } from "@/services/transport.service";
import { Request, Response } from "express";

export const processStreamableHttpRequest = async (
  req: Request,
  res: Response
): Promise<void> => {
  const transport = await transportService.createHttpTransport();
  res.on("close", () => {
    if (transport.sessionId) {
      transportService.removeHttpTransport(transport.sessionId);
    }
  });
  await transport.handleRequest(req, res, req.body);
};

export const processLegacySseRequest = async (
  _req: Request,
  res: Response
): Promise<void> => {
  const transport = await transportService.createSseTransport(res);

  res.on("close", () => {
    transportService.removeSseTransport(transport.sessionId);
  });
};

export const processLegacyMessageRequest = async (
  req: Request,
  res: Response
): Promise<void> => {
  const sessionId = req.query.sessionId as string;
  const transport = transportService.getSseTransport(sessionId);
  if (transport) {
    await transport.handlePostMessage(req, res, req.body);
  } else {
    res.status(400).send("No transport found for sessionId");
  }
};
