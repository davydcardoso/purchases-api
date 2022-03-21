import { DomainError } from "@/core/domain/errors/DomainError";

export class InvalidTypePaymentMethodError
  extends Error
  implements DomainError
{
  constructor(type: string) {
    super(`The payment method "${type}" is invalid`);
    this.name = "InvalidTypePaymentMethodError";
  }
}
