import { Controller } from "@/core/infra/Controller";
import { CreateNewUsersAccount } from "@/modules/users/useCases/CreateNewUsersAccount/CreateNewUsersAccount";
import { CreateNewUsersAccountController } from "@/modules/users/useCases/CreateNewUsersAccount/CreateNewUsersAccountController";
import { CompareFieldsValidator } from "@/shared/infra/validators/CompareFieldsValidator";
import { ValidatorCompositor } from "@/shared/infra/validators/Compositor";
import { UsersRepository } from "../../db/prisma/repositories/UsersRepository";

export function makeCreateNewUsersAccountController(): Controller {
  const prismaUsersRepository = new UsersRepository();

  const createNewUsersAccount = new CreateNewUsersAccount(
    prismaUsersRepository
  );

  const validator = new ValidatorCompositor([
    new CompareFieldsValidator("password", "confirmPassword"),
  ]);

  const createNewUsersAccountController = new CreateNewUsersAccountController(
    validator,
    createNewUsersAccount
  );

  return createNewUsersAccountController;
}
