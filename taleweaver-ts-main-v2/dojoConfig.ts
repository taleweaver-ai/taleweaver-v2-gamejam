import manifest from "./dojoManifest.json";
import { createDojoConfig } from "@dojoengine/core";

export const dojoConfig = createDojoConfig({
  manifest,
  rpcUrl: import.meta.env.VITE_PUBLIC_RPC,
  toriiUrl: import.meta.env.VITE_PUBLIC_TORII,
  masterAddress: import.meta.env.VITE_MASTER_ACCOUNT_ADDRESS,
  masterPrivateKey: import.meta.env.VITE_MASTER_ACCOUNT_PRIVATE_KEY,
});
