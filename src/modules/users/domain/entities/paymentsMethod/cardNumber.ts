import { Either, left, right } from "@/core/logic/Either";
import { InvalidCardNumberError } from "../errors/InvalidCardNumberError";

export class CardNumber {
  private readonly cardNumber: string;

  get value() {
    return this.cardNumber;
  }

  private constructor(cardNumber: string) {
    this.cardNumber = cardNumber;
  }

  static validate(cardNumber: string): boolean {
    if (
      !cardNumber ||
      cardNumber.trim().length < 4 ||
      cardNumber.trim().length > 4
    ) {
      return false;
    }

    return true;
  }

  static create(
    cardNumber: string
  ): Either<InvalidCardNumberError, CardNumber> {
    if (!this.validate(cardNumber)) {
      return left(new InvalidCardNumberError(cardNumber));
    }

    return right(new CardNumber(cardNumber));
  }
}
