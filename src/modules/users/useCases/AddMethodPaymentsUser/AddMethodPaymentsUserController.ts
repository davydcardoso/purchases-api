import { Controller } from "@/core/infra/Controller";
import {
  clientError,
  created,
  fail,
  HttpResponse,
} from "@/core/infra/HttpResponse";
import { AddMethodPaymentsUser } from "./AddMethodPaymentsUser";

type AddMethodPaymentsUserControllerRequest = {
  userId: string;
  name: string;
  isDefault: boolean;
  type: string;
  cardNumber: string;
  cardValidate: string;
};

export class AddMethodPaymentsUserController implements Controller {
  constructor(private addMethodPaymentsUser: AddMethodPaymentsUser) {}

  async handle(
    request: AddMethodPaymentsUserControllerRequest
  ): Promise<HttpResponse> {
    try {
      const { userId, name, type, cardNumber, cardValidate, isDefault } =
        request;

      const result = await this.addMethodPaymentsUser.perform({
        userId,
        name,
        type,
        cardNumber,
        cardValidate,
        isDefault,
      });

      if (result.isLeft()) {
        const error = result.value;

        switch (error.constructor) {
          default:
            return clientError(error);
        }
      }

      return created();
    } catch (err) {
      return fail(err);
    }
  }
}
