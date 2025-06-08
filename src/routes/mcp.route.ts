import {
  processLegacyMessageRequest,
  processLegacySseRequest,
  processStreamableHttpRequest,
} from "@/controllers/mcp.controller";
import { Router } from "express";

const router = Router();

router.post("/mcp", processStreamableHttpRequest);
router.get("/sse", processLegacySseRequest);
router.post("/messages", processLegacyMessageRequest);

export const mcpRoutes = router;
