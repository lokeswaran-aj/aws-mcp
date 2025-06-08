import { appConfig } from "./app";

export const DEFAULT_CONFIG = {
  REGION: appConfig.defaultRegion,
} as const;
