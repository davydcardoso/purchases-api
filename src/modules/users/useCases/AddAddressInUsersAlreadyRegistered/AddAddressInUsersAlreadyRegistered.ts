import { Either, left, right } from "@/core/logic/Either";
import { Address } from "../../domain/entities/address/address";
import { ZipCode } from "../../domain/entities/address/zipCode";
import { IAddressRepository } from "../../repositories/IAddressRepository";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { AddressAlreadyExistsError } from "./errors/AddressAlreadyExistsError";
import { AddressDataIsNotValidError } from "./errors/AddressDataIsNotValidError";
import { UserIsNotExistsInApplicationError } from "./errors/UserIsNotExistsInApplicationError";
import { ZipCodeNotAvailableForDeliveryError } from "./errors/ZipCodeNotAvailableForDeliveryError";

type AddAddressInUsersAlreadyRegisteredRequest = {
  usersId: string;
  address: string;
  zipCode: string;
  complement: string;
  city: string;
  district: string;
};

type AddAddressInUsersAlreadyRegisteredResponse = Either<
  | AddressAlreadyExistsError
  | ZipCodeNotAvailableForDeliveryError
  | UserIsNotExistsInApplicationError
  | AddressDataIsNotValidError,
  AddAddressInUsersAlreadyRegisteredProps
>;

type AddAddressInUsersAlreadyRegisteredProps = {
  address: Address;
};

export class AddAddressInUsersAlreadyRegistered {
  constructor(
    private readonly usersRepository: IUsersRepository,
    private addressRepository: IAddressRepository
  ) {}

  async perform({
    usersId,
    address,
    zipCode,
    city,
    complement,
    district,
  }: AddAddressInUsersAlreadyRegisteredRequest): Promise<AddAddressInUsersAlreadyRegisteredResponse> {
    const zipCodeOrError = ZipCode.create(zipCode);

    if (zipCodeOrError.isLeft()) {
      return left(zipCodeOrError.value);
    }

    const userExists = await this.usersRepository.existsById(usersId);

    if (!userExists) {
      return left(new UserIsNotExistsInApplicationError());
    }

    const addressOrError = Address.create({
      usersId,
      address,
      zipCode: zipCodeOrError.value,
      city,
      complement,
      district,
    });

    if (addressOrError.isLeft()) {
      return left(new AddressDataIsNotValidError());
    }

    const zipCodeAllowed = await this.addressRepository.allowedZipCode(zipCode);

    if (!zipCodeAllowed) {
      return left(new ZipCodeNotAvailableForDeliveryError());
    }

    const addressAlreadyExists =
      await this.addressRepository.addressAlreadyExists(usersId);

    if (addressAlreadyExists) {
      return left(new AddressAlreadyExistsError());
    }

    await this.addressRepository.create(addressOrError.value);

    return right({ address: addressOrError.value });
  }
}
