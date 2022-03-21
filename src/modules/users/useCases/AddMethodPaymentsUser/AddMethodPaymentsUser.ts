import { Either, left, right } from "@/core/logic/Either";
import { InvalidCardNumberError } from "../../domain/entities/errors/InvalidCardNumberError";
import { InvalidTypePaymentMethodError } from "../../domain/entities/errors/InvalidTypePaymentMethodError";
import { CardNumber } from "../../domain/entities/paymentsMethod/cardNumber";
import { PaymentsMethod } from "../../domain/entities/paymentsMethod/paymentsMethod";
import { TypePaymentsMethod } from "../../domain/entities/paymentsMethod/typePaymentMethod";
import { ITypePaymentsMethodRepository } from "../../repositories/ITypePaymentsMethodRepository";
import { PaymentMethodAlreadyExistsError } from "./errors/PaymentMethodAlreadyExistsError";

type AddMethodPaymentsUserRequest = {
  name: string;
  userId: string;
  type: string;
  cardNumber: string;
  cardValidate: string;
};

type AddMethodPaymentsUserResponse = Either<
  InvalidTypePaymentMethodError | InvalidCardNumberError,
  unknown
>;

export class AddMethodPaymentsUser {
  constructor(
    private typePaymentMethodRepository: ITypePaymentsMethodRepository
  ) {}

  async perform({
    userId,
    name,
    type,
    cardNumber,
    cardValidate,
  }: AddMethodPaymentsUserRequest): Promise<AddMethodPaymentsUserResponse> {
    const typePaymentOrErorr = TypePaymentsMethod.create(type);
    const cardNumberOrError = CardNumber.create(cardNumber);

    if (typePaymentOrErorr.isLeft()) {
      return left(new InvalidTypePaymentMethodError(type));
    }

    if (cardNumberOrError.isLeft()) {
      return left(new InvalidCardNumberError(cardNumber));
    }

    const paymentsMethodAlreadyExists =
      await this.typePaymentMethodRepository.exists(userId, type);

    if (paymentsMethodAlreadyExists) {
      return left(new PaymentMethodAlreadyExistsError());
    }

    const paymentsMethodOrError = PaymentsMethod.create({
      userId,
      name,
      cardValidate,
      type: typePaymentOrErorr.value,
      cardNumber: cardNumberOrError.value,
    });

    if (paymentsMethodOrError.isLeft()) {
      return left(paymentsMethodOrError.value);
    }

    await this.typePaymentMethodRepository.create(paymentsMethodOrError.value);

    return right({});
  }
}
