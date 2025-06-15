import {
  associateRouteTableSchema,
  createRouteTableSchema,
  deleteRouteTableSchema,
  disassociateRouteTableSchema,
  listRouteTablesSchema,
  replaceRouteTableAssociationSchema,
} from "@/schema/route-table";
import { server } from "@/server";
import {
  associateRouteTable,
  createRouteTable,
  deleteRouteTable,
  disassociateRouteTable,
  listRouteTables,
  replaceRouteTableAssociation,
} from "./handler";

export const registerRouteTableTools = (): void => {
  server.addTool({
    name: "list-route-tables",
    description: "List route tables in the given region",
    parameters: listRouteTablesSchema,
    annotations: {
      destructiveHint: false,
      openWorldHint: true,
      readOnlyHint: true,
      idempotentHint: true,
      title: "List route tables",
    },
    execute: async (args, context) => await listRouteTables(args, context),
  });

  server.addTool({
    name: "create-route-table",
    description: "Create a route table in the given region",
    parameters: createRouteTableSchema,
    annotations: {
      destructiveHint: false,
      openWorldHint: true,
      readOnlyHint: false,
      idempotentHint: false,
      title: "Create a route table",
    },
    execute: async (args, context) => await createRouteTable(args, context),
  });

  server.addTool({
    name: "associate-route-table",
    description:
      "Associate a route table with a subnet or internet gateway or virtual private gateway",
    parameters: associateRouteTableSchema,
    annotations: {
      destructiveHint: false,
      openWorldHint: true,
      readOnlyHint: false,
      idempotentHint: true,
      title: "Associate a route table with a subnet or gateway",
    },
    execute: async (args, context) => await associateRouteTable(args, context),
  });

  server.addTool({
    name: "disassociate-route-table",
    description:
      "Disassociate a route table from a subnet or internet gateway or virtual private gateway",
    parameters: disassociateRouteTableSchema,
    annotations: {
      destructiveHint: false,
      openWorldHint: true,
      readOnlyHint: false,
      idempotentHint: true,
      title: "Disassociate a route table from a subnet or gateway",
    },
    execute: async (args, context) =>
      await disassociateRouteTable(args, context),
  });

  server.addTool({
    name: "replace-route-table-association",
    description:
      "Replace the route table association for a subnet or internet gateway or virtual private gateway",
    parameters: replaceRouteTableAssociationSchema,
    annotations: {
      destructiveHint: false,
      openWorldHint: true,
      readOnlyHint: false,
      idempotentHint: true,
      title: "Replace the route table association for a subnet or gateway",
    },
    execute: async (args, context) =>
      await replaceRouteTableAssociation(args, context),
  });

  server.addTool({
    name: "delete-route-table",
    description: "Delete a route table in the given region",
    parameters: deleteRouteTableSchema,
    annotations: {
      destructiveHint: true,
      openWorldHint: true,
      readOnlyHint: false,
      idempotentHint: true,
      title: "Delete a route table",
    },
    execute: async (args, context) => await deleteRouteTable(args, context),
  });
};
