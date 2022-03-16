import { Name } from "./name";
import { Email } from "./email";
import { Entity } from "@/core/domain/Entity";
import { Password } from "./password";
import { Either, right } from "@/core/logic/Either";
import { InvalidNameError } from "../errors/InvalidNameError";
import { InvalidEmailUserError } from "../errors/InvalidEmailUserError";
import { InvalidPasswordLengthError } from "../errors/InvalidPasswordLengthError";

type UsersProps = {
  isAdmin: boolean;
  name: Name;
  email: Email;
  password: Password;
  createdAt?: Date;
  updatedAt?: Date;
};

export class Users extends Entity<UsersProps> {
  get isAdmin() {
    return this.props.isAdmin;
  }

  get name() {
    return this.props.name;
  }

  get email() {
    return this.props.email;
  }

  get password() {
    return this.props.password;
  }

  private constructor(props: UsersProps, id?: string) {
    super(props, id);
  }

  static create(
    props: UsersProps,
    id?: string
  ): Either<
    InvalidNameError | InvalidEmailUserError | InvalidPasswordLengthError,
    Users
  > {
    const users = new Users(props, id);

    return right(users);
  }
}
