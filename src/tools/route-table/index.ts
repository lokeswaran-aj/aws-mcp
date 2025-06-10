import {
  createRouteTableSchema,
  listRouteTablesSchema,
} from "@/schema/route-table";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { createRouteTable, listRouteTables } from "./handler";

export const registerRouteTableTools = (server: McpServer): void => {
  server.tool(
    "route-table-list-route-tables",
    "List route tables in the given region",
    listRouteTablesSchema,
    {
      destructiveHint: false,
      openWorldHint: true,
      readOnlyHint: true,
      idempotentHint: true,
      title: "List route tables",
    },
    async (args) => await listRouteTables(args)
  );

  server.tool(
    "route-table-create-route-table",
    "Create a route table in the given region",
    createRouteTableSchema,
    {
      destructiveHint: false,
      openWorldHint: true,
      readOnlyHint: false,
      idempotentHint: true,
      title: "Create a route table",
    },
    async (args) => await createRouteTable(args)
  );
};
