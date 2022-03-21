import { Controller } from "@/core/infra/Controller";
import { AuthenticationsUsers } from "@/modules/users/useCases/AuthenticationsUsers.ts/AuthenticationsUsers";
import { AuthenticationsUsersController } from "@/modules/users/useCases/AuthenticationsUsers.ts/AuthenticationsUsersController";
import { TypePaymentsMethodRepository } from "../../db/prisma/repositories/TypePaymentsMethodRepository";
import { UsersRepository } from "../../db/prisma/repositories/UsersRepository";

export function makeAuthenticationsUsersController(): Controller {
  const prismaUsersRepository = new UsersRepository();
  const prismaPaymentsRepository = new TypePaymentsMethodRepository();

  const authenticationsUsers = new AuthenticationsUsers(
    prismaUsersRepository,
    prismaPaymentsRepository
  );

  const authenticationsUsersController = new AuthenticationsUsersController(
    authenticationsUsers
  );

  return authenticationsUsersController;
}
