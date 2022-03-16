import { DomainError } from "@/core/domain/errors/DomainError";

export class InvalidProductDescriptionValueError
  extends Error
  implements DomainError
{
  constructor(description: string) {
    super(`The description  "${description}" is not valid`);
    this.name = "InvalidProductDescriptionValueError";
  }
}
