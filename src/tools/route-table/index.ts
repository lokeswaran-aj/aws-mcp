import {
  associateRouteTableSchema,
  createRouteTableSchema,
  disassociateRouteTableSchema,
  listRouteTablesSchema,
} from "@/schema/route-table";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import {
  associateRouteTable,
  createRouteTable,
  disassociateRouteTable,
  listRouteTables,
} from "./handler";

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
      idempotentHint: false,
      title: "Create a route table",
    },
    async (args) => await createRouteTable(args)
  );

  server.tool(
    "route-table-associate-route-table",
    "Associate a route table with a subnet or internet gateway or virtual private gateway",
    associateRouteTableSchema,
    {
      destructiveHint: false,
      openWorldHint: true,
      readOnlyHint: false,
      idempotentHint: true,
      title: "Associate a route table with a subnet or gateway",
    },
    async (args) => await associateRouteTable(args)
  );

  server.tool(
    "route-table-disassociate-route-table",
    "Disassociate a route table from a subnet or internet gateway or virtual private gateway",
    disassociateRouteTableSchema,
    {
      destructiveHint: false,
      openWorldHint: true,
      readOnlyHint: false,
      idempotentHint: true,
      title: "Disassociate a route table from a subnet or gateway",
    },
    async (args) => await disassociateRouteTable(args)
  );
};
