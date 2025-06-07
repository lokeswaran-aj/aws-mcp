import { NextFunction, Request, Response } from "express";

export const mcpErrorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.error("Error handling MCP request:", error.message);
  if (!res.headersSent) {
    res.status(500).json({
      jsonrpc: "2.0",
      error: {
        code: -32603,
        message: "Internal server error",
      },
      id: req.query.sessionId,
    });
  }
  next(error);
};
