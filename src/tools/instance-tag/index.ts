import {
  createInstanceTagSchema,
  deleteInstanceTagSchema,
  listInstanceTagsSchema,
} from "@/schema/instance-tag";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp";
import {
  createInstanceTag,
  deleteInstanceTag,
  listInstanceTags,
} from "./handler";

export const registerInstanceTagTools = (server: McpServer): void => {
  server.tool(
    "instance-tag-list-instance-tags",
    "List instance tags",
    listInstanceTagsSchema,
    {
      title: "List instance tags",
      destructiveHint: false,
      idempotentHint: true,
      readOnlyHint: true,
    },
    async (args) => listInstanceTags(args)
  );

  server.tool(
    "instance-tag-create-instance-tag",
    "Create instance tag",
    createInstanceTagSchema,
    {
      title: "Create instance tag",
      destructiveHint: false,
      idempotentHint: false,
      readOnlyHint: false,
    },
    async (args) => createInstanceTag(args)
  );

  server.tool(
    "instance-tag-delete-instance-tag",
    "Delete instance tag",
    deleteInstanceTagSchema,
    {
      title: "Delete instance tag",
      destructiveHint: true,
      idempotentHint: true,
      readOnlyHint: false,
    },
    async (args) => deleteInstanceTag(args)
  );
};
