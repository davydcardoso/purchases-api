import { Controller } from "@/core/infra/Controller";
import {
  clientError,
  created,
  fail,
  HttpResponse,
} from "@/core/infra/HttpResponse";
import { CreateAlloweredZipCodes } from "./CreateAlloweredZipCodes";

type CreateAlloweredZipCodesControllerRequest = {
  zipCode: string;
};

export class CreateAlloweredZipCodesController implements Controller {
  constructor(private createAlloweredZipCodes: CreateAlloweredZipCodes) {}

  async handle(
    request: CreateAlloweredZipCodesControllerRequest
  ): Promise<HttpResponse> {
    try {
      const { zipCode } = request;

      const result = await this.createAlloweredZipCodes.perform({ zipCode });

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
