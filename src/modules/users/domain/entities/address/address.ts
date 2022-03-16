import { Entity } from "@/core/domain/Entity";
import { Either, right } from "@/core/logic/Either";
import { ZipCode } from "./zipCode";

type AddressProps = {
  usersId: string;
  address: string;
  zipCode: ZipCode;
  complement: string;
  city: string;
  district: string;
};

export class Address extends Entity<AddressProps> {
  get usersId() {
    return this.props.usersId;
  }

  get address() {
    return this.props.address;
  }

  get zipCode() {
    return this.props.zipCode;
  }

  get complement() {
    return this.props.complement;
  }

  get city() {
    return this.props.city;
  }

  get district() {
    return this.props.district;
  }

  private constructor(props: AddressProps, id?: string) {
    super(props, id);
  }

  static create(props: AddressProps, id?: string): Either<Error, Address> {
    const address = new Address(props, id);

    return right(address);
  }
}
