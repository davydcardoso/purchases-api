import { Either, left, right } from "@/core/logic/Either";
import { InvalidTypePaymentMethodError } from "../errors/InvalidTypePaymentMethodError";

export class TypePaymentsMethod {
  private readonly type: string;

  get value() {
    return this.type;
  }

  private constructor(typePayment: string) {
    this.type = typePayment;
  }

  static validate(typePayment: string): boolean {
    const typeString = ["credit_card", "debit_card", "money", "pix"] as const;
    type TypePayment = typeof typeString[number];

    if (
      !typePayment ||
      typePayment.trim().length < 5 ||
      typePayment.trim().length > 255
    ) {
      return false;
    }

    switch (typePayment as TypePayment) {
      case "credit_card":
        return true;
      case "debit_card":
        return true;
      case "money":
        return true;
      case "pix":
        return true;
      default:
        return false;
    }
  }

  static create(
    typePayment: string
  ): Either<InvalidTypePaymentMethodError, TypePaymentsMethod> {
    if (!this.validate(typePayment)) {
      return left(new InvalidTypePaymentMethodError(typePayment));
    }

    return right(new TypePaymentsMethod(typePayment));
  }
}
