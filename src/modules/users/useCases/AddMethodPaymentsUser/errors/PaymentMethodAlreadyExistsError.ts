import { UseCaseError } from "@/core/domain/errors/UseCaseError";

export class PaymentMethodAlreadyExistsError
  extends Error
  implements UseCaseError
{
  constructor() {
    super("The payments method already exists");
    this.name = "PaymentMethodAlreadyExistsError";
  }
}
