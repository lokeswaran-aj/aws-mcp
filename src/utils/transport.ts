import { server } from "@/server";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import { Response } from "express";

export const setupTransport = async (
  res: Response
): Promise<StreamableHTTPServerTransport> => {
  const transport = new StreamableHTTPServerTransport({
    sessionIdGenerator: undefined,
  });

  res.on("close", () => {
    console.log("Request closed");
    transport.close();
    server.close();
  });

  await server.connect(transport);
  return transport;
};
