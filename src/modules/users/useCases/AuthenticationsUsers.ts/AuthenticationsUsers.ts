import { Either, left, right } from "@/core/logic/Either";
import { JWT } from "../../domain/entities/users/jwt";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { InvalidEmailOrPasswordError } from "./errors/InvalidEmailOrPasswordError";
import { UserNotFoundWithThisEmailError } from "./errors/UserNotFoundWithThisEmailError";

type AuthenticationsUsersRequest = {
  username: string;
  password: string;
};

type AuthenticationsUsersResponse = Either<
  Error,
  AuthenticationsUsersResponseProps
>;

type AuthenticationsUsersResponseProps = {
  token: string;
  user: {
    id: string;
    isAdmin: boolean;
    name: string;
  };
};

export class AuthenticationsUsers {
  constructor(private usersRepository: IUsersRepository) {}

  async perform({
    username,
    password,
  }: AuthenticationsUsersRequest): Promise<AuthenticationsUsersResponse> {
    const user = await this.usersRepository.findByEmail(username);

    if (!user) {
      return left(new UserNotFoundWithThisEmailError(username));
    }

    const isPasswordValid = await user.password.comparePassword(password);

    if (!isPasswordValid) {
      return left(new InvalidEmailOrPasswordError());
    }

    const { token } = JWT.signUser(user);

    return right({
      token,
      user: {
        id: user.id,
        isAdmin: user.isAdmin,
        name: user.name.value,
      },
    });
  }
}
