import { UseCaseError } from "@/core/domain/errors/UseCaseError";

export class UserIsNotExistsInApplicationError
  extends Error
  implements UseCaseError
{
  constructor() {
    super("The user is not exists in system");
    this.name = "UserIsNotExistsInApplicationError";
  }
}
