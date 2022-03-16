import { DomainError } from "@/core/domain/errors/DomainError";

export class ValueProductsIsInvalidError extends Error implements DomainError {
  constructor() {
    super(`The value product is not value`);
    this.name = "ValueProductsIsInvalidError";
  }
}
