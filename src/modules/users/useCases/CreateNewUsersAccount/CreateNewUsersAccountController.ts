import { Controller } from "@/core/infra/Controller";
import { clientError, created, HttpResponse } from "@/core/infra/HttpResponse";
import { Validator } from "@/core/infra/Validator";
import { ValidatorCompositor } from "@/shared/infra/validators/Compositor";
import { fail } from "assert";
import { CreateNewUsersAccount } from "./CreateNewUsersAccount";

type CreateNewUsersAccountControllerRequest = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export class CreateNewUsersAccountController implements Controller {
  constructor(
    private readonly validator: Validator<CreateNewUsersAccountControllerRequest>,
    private createNewUsersAccount: CreateNewUsersAccount
  ) {}

  async handle(
    request: CreateNewUsersAccountControllerRequest
  ): Promise<HttpResponse> {
    try {
      const validationResult = this.validator.validate(request);

      if (validationResult.isLeft()) {
        return clientError(validationResult.value);
      }

      const { name, email, password } = request;

      const result = await this.createNewUsersAccount.perform({
        name,
        email,
        password,
      });

      if (result.isLeft()) {
        const error = result.value;

        switch (error.constructor) {
          default:
            return clientError(error);
        }
      }

      return created(result.value);
    } catch (err) {
      return fail(err);
    }
  }
}
