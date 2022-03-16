import { DomainError } from "@/core/domain/errors/DomainError";

export class InvalidProductsNameError extends Error implements DomainError {
  constructor(name: string) {
    super(`The product name "${name}" is not valid`);
    this.name = "InvalidProductsNameError";
  }
}
