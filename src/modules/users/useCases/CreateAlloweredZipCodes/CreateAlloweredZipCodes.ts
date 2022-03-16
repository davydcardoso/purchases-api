import { Either, left, right } from "@/core/logic/Either";
import { ZipCode } from "../../domain/entities/address/zipCode";
import { IAddressRepository } from "../../repositories/IAddressRepository";
import { ZipCodeAlreadyExistsError } from "./errors/ZipCodeAlreadyExistsError";

type CreateAlloweredZipCodesRequest = {
  zipCode: string;
};

type CreateAlloweredZipCodesResponse = Either<
  Error,
  CreateAlloweredZipCodesResponseProps
>;

type CreateAlloweredZipCodesResponseProps = {};

export class CreateAlloweredZipCodes {
  constructor(private addressRepository: IAddressRepository) {}

  async perform({
    zipCode,
  }: CreateAlloweredZipCodesRequest): Promise<CreateAlloweredZipCodesResponse> {
    const zipCodeOrError = ZipCode.create(zipCode);

    if (zipCodeOrError.isLeft()) {
      return left(zipCodeOrError.value);
    }

    const { value: zipcode } = zipCodeOrError.value;

    const existsAllowedZipCode =
      await this.addressRepository.existsAllowedZipCode(zipcode);

    if (existsAllowedZipCode) {
      return left(new ZipCodeAlreadyExistsError());
    }

    await this.addressRepository.createAllowedZipCode(zipcode);

    return right({});
  }
}
