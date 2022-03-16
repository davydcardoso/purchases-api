import { UseCaseError } from "@/core/domain/errors/UseCaseError";

export class UserNotFoundWithThisEmailError
  extends Error
  implements UseCaseError
{
  constructor(email: string) {
    super(`This email "${email}" does not belong to any registered user`);
    this.name = "UserNotFoundWithThisEmailError";
  }
}
