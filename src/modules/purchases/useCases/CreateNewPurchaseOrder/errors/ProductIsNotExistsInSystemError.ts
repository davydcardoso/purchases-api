import { UseCaseError } from "@/core/domain/errors/UseCaseError";

export class ProductIsNotExistsInSystemError
  extends Error
  implements UseCaseError
{
  constructor() {
    super(`The product is not exists`);
    this.name = "ProductIsNotExistsInSystemError";
  }
}
