import { Either, left, right } from "@/core/logic/Either";
import { Email } from "../../domain/entities/users/email";
import { InvalidEmailUserError } from "../../domain/entities/errors/InvalidEmailUserError";
import { InvalidNameError } from "../../domain/entities/errors/InvalidNameError";
import { InvalidPasswordLengthError } from "../../domain/entities/errors/InvalidPasswordLengthError";
import { Name } from "../../domain/entities/users/name";
import { Password } from "../../domain/entities/users/password";
import { Users } from "../../domain/entities/users/users";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { AccountAlreadyExistsError } from "./errors/AccountAlreadyExistsError";

type CreateNewUsersAccountRequest = {
  name: string;
  email: string;
  password: string;
};

type CreateNewUsersAccountResponse = Either<
  | InvalidNameError
  | InvalidEmailUserError
  | InvalidPasswordLengthError
  | AccountAlreadyExistsError,
  CreateNewUsersAccountResponseProps
>;

type CreateNewUsersAccountResponseProps = {
  data?: Users;
};

export class CreateNewUsersAccount {
  constructor(private usersRepository: IUsersRepository) {}

  async perform({
    name,
    email,
    password,
  }: CreateNewUsersAccountRequest): Promise<CreateNewUsersAccountResponse> {
    const nameOrError = Name.create(name);
    const emailOrError = Email.create(email);
    const passwordOrError = Password.create(password);

    if (nameOrError.isLeft()) {
      return left(nameOrError.value);
    }

    if (emailOrError.isLeft()) {
      return left(emailOrError.value);
    }

    if (passwordOrError.isLeft()) {
      return left(passwordOrError.value);
    }

    const usersOrError = Users.create({
      isAdmin: false,
      name: nameOrError.value,
      email: emailOrError.value,
      password: passwordOrError.value,
    });

    if (usersOrError.isLeft()) {
      return left(usersOrError.value);
    }

    const users = usersOrError.value;

    const userAlreadyExist = await this.usersRepository.exists(
      users.email.value
    );

    if (userAlreadyExist) {
      return left(new AccountAlreadyExistsError(users.email.value));
    }

    await this.usersRepository.create(users);
    return right({ data: users });
  }
}
