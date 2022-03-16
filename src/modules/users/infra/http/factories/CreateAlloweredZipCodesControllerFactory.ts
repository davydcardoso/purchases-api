import { Controller } from "@/core/infra/Controller";
import { CreateAlloweredZipCodes } from "@/modules/users/useCases/CreateAlloweredZipCodes/CreateAlloweredZipCodes";
import { CreateAlloweredZipCodesController } from "@/modules/users/useCases/CreateAlloweredZipCodes/CreateAlloweredZipCodesController";
import { AddressRepository } from "../../db/prisma/repositories/AddressRepository";

export function makeCreateAlloweredZipCodesController(): Controller {
  const prismaAddressRepository = new AddressRepository();

  const createAlloweredZipCodes = new CreateAlloweredZipCodes(
    prismaAddressRepository
  );

  const createAlloweredZipCodesController =
    new CreateAlloweredZipCodesController(createAlloweredZipCodes);

  return createAlloweredZipCodesController;
}
