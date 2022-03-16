import { Controller } from "@/core/infra/Controller";
import { clientError, fail, HttpResponse, ok } from "@/core/infra/HttpResponse";
import { AuthenticationsUsers } from "./AuthenticationsUsers";

type AuthenticationsUsersControllerRequest = {
  authorization: string;
};

export class AuthenticationsUsersController implements Controller {
  constructor(private authenticationsUsers: AuthenticationsUsers) {}

  async handle(
    request: AuthenticationsUsersControllerRequest
  ): Promise<HttpResponse> {
    try {
      const { authorization } = request;

      const [, basicToken] = authorization.split(" ");

      const [username, password] = Buffer.from(basicToken, "base64")
        .toString("ascii")
        .split(":");

      const result = await this.authenticationsUsers.perform({
        username,
        password,
      });

      if (result.isLeft()) {
        const error = result.value;

        switch (error.constructor) {
          default:
            return clientError(error);
        }
      }

      return ok(result.value);
    } catch (err) {
      return fail(err);
    }
  }
}
