import { Either, left, right } from "@/core/logic/Either";
import { InvalidZipCodeError } from "../errors/InvalidZipCodeError";

export class ZipCode {
  private readonly zipCode: string;

  get value() {
    return this.zipCode;
  }

  constructor(zipCode: string) {
    this.zipCode = zipCode;
  }

  static validate(zipCode: string): boolean {
    if (!zipCode || zipCode.trim().length < 7 || zipCode.trim().length > 10) {
      return false;
    }

    const regex = /[0-9]{5}-[\d]{3}/;

    if (!regex.test(zipCode)) {
      return false;
    }

    return true;
  }

  static create(zipCode: string): Either<InvalidZipCodeError, ZipCode> {
    if (!this.validate(zipCode)) {
      return left(new InvalidZipCodeError(zipCode));
    }

    return right(new ZipCode(zipCode));
  }
}
