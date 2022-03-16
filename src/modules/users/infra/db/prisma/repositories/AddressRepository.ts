import { Address } from "@/modules/users/domain/entities/address/address";
import { AddressMappers } from "@/modules/users/mappers/AddressMappers";
import { IAddressRepository } from "@/modules/users/repositories/IAddressRepository";
import { prisma } from "@/shared/infra/db/prisma/connection";

export class AddressRepository implements IAddressRepository {
  async create(address: Address): Promise<void> {
    const data = AddressMappers.toPersistence(address);

    await prisma.address.create({ data });
  }

  async delete(usersId: string): Promise<void> {
    await prisma.$executeRawUnsafe(
      "DELETE FROM address WHERE users_id = $1",
      usersId
    );
  }

  async allowedZipCode(zipCode: string): Promise<boolean> {
    const allowed = await prisma.availableLocations.findUnique({
      where: { zipCode },
    });

    return !!allowed;
  }

  async exists(usersId: string): Promise<boolean> {
    const addressExists = await prisma.address.findFirst({
      where: { usersId },
    });

    return !!addressExists;
  }

  async findByUserId(usersId: string): Promise<Address> {
    const address = await prisma.address.findFirst({ where: { usersId } });

    return AddressMappers.toDomain(address);
  }

  async createAllowedZipCode(zipCode: string): Promise<void> {
    await prisma.availableLocations.create({ data: { zipCode } });
  }

  async existsAllowedZipCode(zipCode: string): Promise<boolean> {
    const existsAllowedZipCode = await prisma.availableLocations.findUnique({
      where: { zipCode },
    });

    return !!existsAllowedZipCode;
  }

  async addressAlreadyExists(usersId: string): Promise<boolean> {
    const exists = await prisma.address.findFirst({ where: { usersId } });

    return !!exists;
  }
}
