import { decode } from "jsonwebtoken";

import { fail, forbidden, HttpResponse, ok } from "@/core/infra/HttpResponse";
import { Middleware } from "@/core/infra/Middleware";

import { AccessDeniedError } from "../errors/AccessDeniedError";
import { UserDoesNotHavePermissionError } from "../errors/UserDoesNotHavePermissionError";

type EnsureAuthenticatedMiddlewareRequest = {
  accessToken: string;
};

type DecodedJwt = {
  isAdmin: boolean;
  sub: string;
  exp: number;
};

export class EnsureAuthenticatedMiddleware implements Middleware {
  constructor(private readonly adminOnly: boolean) {}

  async handle(
    request: EnsureAuthenticatedMiddlewareRequest
  ): Promise<HttpResponse> {
    try {
      const { accessToken } = request;

      if (accessToken) {
        try {
          const [, token] = accessToken.split(" ");

          const decoded = decode(token) as DecodedJwt;

          if (this.adminOnly && !decoded.isAdmin) {
            return forbidden(new UserDoesNotHavePermissionError());
          }

          return ok({ userId: decoded.sub, isAdmin: decoded.isAdmin });
        } catch (err) {
          return forbidden(new AccessDeniedError());
        }
      }

      return forbidden(new AccessDeniedError());
    } catch (error) {
      return fail(error);
    }
  }
}

export namespace AuthMiddleware {
  export type Request = {
    accessToken?: string;
  };
}
