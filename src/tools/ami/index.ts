import { createAmiSchema, deleteAmiSchema, listAmisSchema } from "@/schema/ami";
import { server } from "@/server";
import { createAmi, deleteAmi, listAmis } from "./handler";

export const registerAmiTools = (): void => {
  server.addTool({
    name: "list-amis",
    description: "List AMIs",
    parameters: listAmisSchema,
    annotations: {
      title: "List AMIs",
      destructiveHint: false,
      idempotentHint: true,
      readOnlyHint: true,
    },
    execute: async (args, context) => await listAmis(args, context),
  });

  server.addTool({
    name: "create-ami",
    description: "Create an AMI",
    parameters: createAmiSchema,
    annotations: {
      title: "Create AMI",
      destructiveHint: false,
      idempotentHint: false,
      readOnlyHint: false,
    },
    execute: async (args, context) => await createAmi(args, context),
  });

  server.addTool({
    name: "delete-ami",
    description: "Delete an AMI",
    parameters: deleteAmiSchema,
    annotations: {
      title: "Delete AMI",
      destructiveHint: true,
      idempotentHint: true,
      readOnlyHint: false,
    },
    execute: async (args, context) => await deleteAmi(args, context),
  });
};
