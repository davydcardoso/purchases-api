import { Address } from "../domain/entities/address/address";
import { Address as AddressPersistence } from "@prisma/client";
import { ZipCode } from "../domain/entities/address/zipCode";

export class AddressMappers {
  static toPersistence(raw: Address) {
    return {
      address: raw.address,
      city: raw.city,
      complement: raw.complement,
      district: raw.district,
      usersId: raw.usersId,
      zipCode: raw.zipCode.value,
    };
  }

  static toDomain(raw: AddressPersistence): Address {
    const zipCodeOrError = ZipCode.create(raw.zipCode);

    if (zipCodeOrError.isLeft()) {
      throw zipCodeOrError.value;
    }

    const addressOrError = Address.create(
      {
        ...raw,
        zipCode: zipCodeOrError.value,
      },
      raw.id
    );

    if (addressOrError.isLeft()) {
      return null;
    }

    return addressOrError.value;
  }
}
