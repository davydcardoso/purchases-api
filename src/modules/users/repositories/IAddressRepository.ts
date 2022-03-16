import { Address } from "../domain/entities/address/address";

export interface IAddressRepository {
  create(address: Address): Promise<void>;
  findByUserId(usersId: string): Promise<Address>;
  delete(usersId: string): Promise<void>;
  exists(usersId: string): Promise<boolean>;
  allowedZipCode(zipCode: string): Promise<boolean>;
  createAllowedZipCode(zipCode: string): Promise<void>;
  existsAllowedZipCode(zipCode: string): Promise<boolean>;
  addressAlreadyExists(usersId: string): Promise<boolean>;
}
