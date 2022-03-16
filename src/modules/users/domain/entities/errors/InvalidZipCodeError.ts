import { DomainError } from "@/core/domain/errors/DomainError";

export class InvalidZipCodeError extends Error implements DomainError {
  constructor(zipCode: string) {
    super(`The zip code "${zipCode}" is not valid`);
    this.name = "InvalidZipCodeError";
  }
}
