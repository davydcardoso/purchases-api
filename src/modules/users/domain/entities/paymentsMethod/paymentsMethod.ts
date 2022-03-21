import { Entity } from "@/core/domain/Entity";
import { Either, right } from "@/core/logic/Either";
import { InvalidCardNumberError } from "../errors/InvalidCardNumberError";
import { InvalidTypePaymentMethodError } from "../errors/InvalidTypePaymentMethodError";
import { CardNumber } from "./cardNumber";
import { TypePaymentsMethod } from "./typePaymentMethod";

type PaymentsMethodProps = {
  userId: string;
  name: string;
  type: TypePaymentsMethod;
  cardNumber: CardNumber;
  cardValidate: string;
};

export class PaymentsMethod extends Entity<PaymentsMethodProps> {
  get userId() {
    return this.props.userId;
  }

  get name() {
    return this.props.name;
  }

  get type() {
    return this.props.type;
  }

  get cardNumber() {
    return this.props.cardNumber;
  }

  get cardValidate() {
    return this.props.cardValidate;
  }

  private constructor(props: PaymentsMethodProps, id?: string) {
    super(props, id);
  }

  static create(
    props: PaymentsMethodProps,
    id?: string
  ): Either<
    InvalidCardNumberError | InvalidTypePaymentMethodError,
    PaymentsMethod
  > {
    const paymentsMethod = new PaymentsMethod(props, id);

    return right(paymentsMethod);
  }
}
