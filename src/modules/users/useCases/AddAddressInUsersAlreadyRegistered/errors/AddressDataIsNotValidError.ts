import { UseCaseError } from "@/core/domain/errors/UseCaseError";

export class AddressDataIsNotValidError extends Error implements UseCaseError {
  constructor() {
    super("The address is not valid");
    this.name = "AddressDataIsNotValidError";
  }
}
