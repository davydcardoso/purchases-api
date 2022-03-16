import { UseCaseError } from "@/core/domain/errors/UseCaseError";

export class AddressAlreadyExistsError extends Error implements UseCaseError {
  constructor() {
    super(`The address already exists in system`);
    this.name = "AddressAlreadyExistsError";
  }
}
