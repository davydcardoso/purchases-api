import { Either, left, right } from "@/core/logic/Either";
import { InvalidProductDescriptionValueError } from "./errors/InvalidProductDescriptionValueError";

export class Description {
  private readonly description: string;

  get value() {
    return this.description;
  }

  private constructor(description: string) {
    this.description = description;
  }

  static validate(description: string): boolean {
    if (
      !description ||
      description.trim().length < 5 ||
      description.trim().length > 255
    ) {
      return false;
    }

    return true;
  }

  static create(
    description: string
  ): Either<InvalidProductDescriptionValueError, Description> {
    if (!this.validate(description)) {
      return left(new InvalidProductDescriptionValueError(description));
    }

    return right(new Description(description));
  }
}
