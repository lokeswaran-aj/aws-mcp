import {
  createKeyPairSchema,
  deleteKeyPairSchema,
  importKeyPairSchema,
  listKeyPairsSchema,
} from "@/schema/key-pair";
import { server } from "@/server";
import {
  createKeyPair,
  deleteKeyPair,
  importKeyPair,
  listKeyPairs,
} from "./handler";

export const registerKeyPairTools = (): void => {
  server.addTool({
    name: "list-key-pairs",
    description: "List key pairs in the given region",
    parameters: listKeyPairsSchema,
    annotations: {
      destructiveHint: false,
      openWorldHint: true,
      readOnlyHint: true,
      idempotentHint: true,
      title: "List Key Pairs",
    },
    execute: async (args, context) => await listKeyPairs(args, context),
  });

  server.addTool({
    name: "create-key-pair",
    description: "Create a key pair in the given region",
    parameters: createKeyPairSchema,
    annotations: {
      destructiveHint: false,
      openWorldHint: true,
      readOnlyHint: false,
      idempotentHint: false,
      title: "Create Key Pair",
    },
    execute: async (args, context) => await createKeyPair(args, context),
  });

  server.addTool({
    name: "import-key-pair",
    description: "Import a key pair in the given region",
    parameters: importKeyPairSchema,
    annotations: {
      destructiveHint: false,
      openWorldHint: true,
      readOnlyHint: false,
      idempotentHint: false,
      title: "Import Key Pair",
    },
    execute: async (args, context) => await importKeyPair(args, context),
  });

  server.addTool({
    name: "delete-key-pair",
    description: "Delete a key pair in the given region",
    parameters: deleteKeyPairSchema,
    annotations: {
      destructiveHint: true,
      openWorldHint: true,
      readOnlyHint: false,
      idempotentHint: true,
      title: "Delete Key Pair",
    },
    execute: async (args, context) => await deleteKeyPair(args, context),
  });
};
