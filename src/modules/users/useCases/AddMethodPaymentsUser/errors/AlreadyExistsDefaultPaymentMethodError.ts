import { UseCaseError } from "@/core/domain/errors/UseCaseError";

export class AlreadyExistsDefaultPaymentMethodError
  extends Error
  implements UseCaseError
{
  constructor() {
    super("The method payment default already exists");
    this.name = "AlreadyExistsDefaultPaymentMethodError";
  }
}
