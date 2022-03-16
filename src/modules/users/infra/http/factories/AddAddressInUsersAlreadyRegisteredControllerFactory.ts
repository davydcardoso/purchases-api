import { Controller } from "@/core/infra/Controller";
import { AddAddressInUsersAlreadyRegistered } from "@/modules/users/useCases/AddAddressInUsersAlreadyRegistered/AddAddressInUsersAlreadyRegistered";
import { AddAddressInUsersAlreadyRegisteredController } from "@/modules/users/useCases/AddAddressInUsersAlreadyRegistered/AddAddressInUsersAlreadyRegisteredController";
import { AddressRepository } from "../../db/prisma/repositories/AddressRepository";
import { UsersRepository } from "../../db/prisma/repositories/UsersRepository";

export function makeAddAddressInUsersAlreadyRegisteredController(): Controller {
  const prismaUsersRepository = new UsersRepository();
  const prismaAddressRepository = new AddressRepository();

  const addAddressInUsersAlreadyRegistered =
    new AddAddressInUsersAlreadyRegistered(
      prismaUsersRepository,
      prismaAddressRepository
    );

  const addAddressInUsersAlreadyRegisteredController =
    new AddAddressInUsersAlreadyRegisteredController(
      addAddressInUsersAlreadyRegistered
    );

  return addAddressInUsersAlreadyRegisteredController;
}
