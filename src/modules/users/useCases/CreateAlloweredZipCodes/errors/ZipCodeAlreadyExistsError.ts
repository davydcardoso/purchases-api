import { UseCaseError } from "@/core/domain/errors/UseCaseError";

export class ZipCodeAlreadyExistsError extends Error implements UseCaseError {
  constructor() {
    super(`The zip code already exists in system`);
    this.name = "ZipCodeAlreadyExistsError";
  }
}
