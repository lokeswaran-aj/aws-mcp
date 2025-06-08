import { Request, Response } from "express";

export const mcpErrorHandler = (
  error: Error,
  _req: Request,
  res: Response
): void => {
  console.error("Error handling MCP request:", error.message);
  res.status(500).json({
    message: "Internal server error",
    error: error.message,
  });
};
