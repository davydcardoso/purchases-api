import { Middleware } from "@/core/infra/Middleware";
import { EnsureAuthenticatedMiddleware } from "../../middleware/EnsureAuthenticatedMiddleware";

export function makeEnsureAuthenticatedMiddleware(
  adminOnly: boolean = false
): Middleware {
  const ensureAuthenticatedMiddleware = new EnsureAuthenticatedMiddleware(
    adminOnly
  );

  return ensureAuthenticatedMiddleware;
}
