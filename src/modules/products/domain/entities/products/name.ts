import { Either, left, right } from "@/core/logic/Either";
import { InvalidProductsNameError } from "./errors/InvalidProductsNameError";

export class Name {
  private readonly name: string;

  get value() {
    return this.name;
  }

  private constructor(name: string) {
    this.name = name;
  }

  static validate(name: string): boolean {
    if (!name || name.trim().length < 5 || name.trim().length > 255) {
      return false;
    }

    return true;
  }

  static create(name: string): Either<InvalidProductsNameError, Name> {
    if (!this.validate(name)) {
      return left(new InvalidProductsNameError(name));
    }

    return right(new Name(name));
  }
}
