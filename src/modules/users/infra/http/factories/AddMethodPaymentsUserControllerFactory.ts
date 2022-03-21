import { Controller } from "@/core/infra/Controller";
import { AddMethodPaymentsUser } from "@/modules/users/useCases/AddMethodPaymentsUser/AddMethodPaymentsUser";
import { AddMethodPaymentsUserController } from "@/modules/users/useCases/AddMethodPaymentsUser/AddMethodPaymentsUserController";
import { TypePaymentsMethodRepository } from "../../db/prisma/repositories/TypePaymentsMethodRepository";

export function makeAddMethodPaymentsUserController(): Controller {
  const prismaMethodPaymentsRepository = new TypePaymentsMethodRepository();

  const addMethodPaymentsUser = new AddMethodPaymentsUser(
    prismaMethodPaymentsRepository
  );

  const addMethodPaymentsUserController = new AddMethodPaymentsUserController(
    addMethodPaymentsUser
  );

  return addMethodPaymentsUserController;
}
