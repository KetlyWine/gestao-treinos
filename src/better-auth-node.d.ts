declare module "better-auth/node" {
  import type { IncomingHttpHeaders } from "node:http";

  export function fromNodeHeaders(nodeHeaders: IncomingHttpHeaders): Headers;
}
