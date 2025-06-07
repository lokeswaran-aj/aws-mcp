import { SSEServerTransport } from "@modelcontextprotocol/sdk/server/sse.js";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import { Response } from "express";
import { randomUUID } from "node:crypto";
import { server } from "../server";

class TransportService {
  private sseTransports: Record<string, SSEServerTransport> = {};
  private httpTransports: Record<string, StreamableHTTPServerTransport> = {};

  async createSseTransport(res: Response): Promise<SSEServerTransport> {
    const transport = new SSEServerTransport("/messages", res);
    this.sseTransports[transport.sessionId] = transport;
    await server.connect(transport);
    return transport;
  }

  getSseTransport(sessionId: string): SSEServerTransport | undefined {
    return this.sseTransports[sessionId];
  }

  removeSseTransport(sessionId: string): void {
    delete this.sseTransports[sessionId];
  }

  createHttpTransport = async (): Promise<StreamableHTTPServerTransport> => {
    const transport = new StreamableHTTPServerTransport({
      sessionIdGenerator: (): string => randomUUID(),
      onsessioninitialized: (sessionId: string): void => {
        this.httpTransports[sessionId] = transport;
      },
    });

    await server.connect(transport);
    return transport;
  };

  removeHttpTransport(sessionId: string): void {
    delete this.httpTransports[sessionId];
  }
}

export const transportService = new TransportService();
