import {
  createInstanceTagSchema,
  deleteInstanceTagSchema,
  listInstanceTagsSchema,
} from "@/schema/instance-tag";
import { server } from "@/server";
import {
  createInstanceTag,
  deleteInstanceTag,
  listInstanceTags,
} from "./handler";

export const registerInstanceTagTools = (): void => {
  server.addTool({
    name: "list-instance-tags",
    description: "List instance tags",
    parameters: listInstanceTagsSchema,
    annotations: {
      title: "List instance tags",
      destructiveHint: false,
      idempotentHint: true,
      readOnlyHint: true,
    },
    execute: async (args, context) => await listInstanceTags(args, context),
  });

  server.addTool({
    name: "create-instance-tag",
    description: "Create instance tag",
    parameters: createInstanceTagSchema,
    annotations: {
      title: "Create instance tag",
      destructiveHint: false,
      idempotentHint: false,
      readOnlyHint: false,
    },
    execute: async (args, context) => await createInstanceTag(args, context),
  });

  server.addTool({
    name: "delete-instance-tag",
    description: "Delete instance tag",
    parameters: deleteInstanceTagSchema,
    annotations: {
      title: "Delete instance tag",
      destructiveHint: true,
      idempotentHint: true,
      readOnlyHint: false,
    },
    execute: async (args, context) => await deleteInstanceTag(args, context),
  });
};
