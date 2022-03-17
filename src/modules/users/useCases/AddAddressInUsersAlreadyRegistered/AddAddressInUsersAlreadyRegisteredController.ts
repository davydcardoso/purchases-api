import { Controller } from "@/core/infra/Controller";
import {
  clientError,
  created,
  fail,
  HttpResponse,
} from "@/core/infra/HttpResponse";
import { AddAddressInUsersAlreadyRegistered } from "./AddAddressInUsersAlreadyRegistered";

type AddAddressInUsersAlreadyRegisteredControllerRequest = {
  usersId: string;
  address: string;
  zipCode: string;
  complement: string;
  city: string;
  district: string;
};

export class AddAddressInUsersAlreadyRegisteredController
  implements Controller
{
  constructor(
    private addAddressInUsersAlreadyRegistered: AddAddressInUsersAlreadyRegistered
  ) {}

  async handle(
    request: AddAddressInUsersAlreadyRegisteredControllerRequest
  ): Promise<HttpResponse> {
    try {
      const { usersId, address, zipCode, city, complement, district } = request;

      const result = await this.addAddressInUsersAlreadyRegistered.perform({
        usersId,
        address,
        zipCode,
        city,
        complement,
        district,
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
