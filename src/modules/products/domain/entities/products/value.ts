import { Either, left, right } from "@/core/logic/Either";
import { ValueProductsIsInvalidError } from "./errors/ValueProductsIsInvalidError";

export class Value {
  private readonly valueProduct: number;

  get value() {
    return this.valueProduct;
  }

  private constructor(value: number) {
    this.valueProduct = value;
  }

  static validate(value: number): boolean {
    if (!value || value < 0.1 || value > 9999999) {
      return false;
    }

    return true;
  }

  static create(value: number): Either<ValueProductsIsInvalidError, Value> {
    if (!this.validate(value)) {
      return left(new ValueProductsIsInvalidError());
    }

    return right(new Value(value));
  }
}
