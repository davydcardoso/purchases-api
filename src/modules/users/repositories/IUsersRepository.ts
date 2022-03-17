import { Users } from "../domain/entities/users/users";

export interface IUsersRepository {
  create(user: Users): Promise<string>;
  findById(id: string): Promise<Users>;
  findByEmail(email: string): Promise<Users>;
  delete(id: string): Promise<void>;
  findMany(): Promise<Users[]>;
  exists(email: string): Promise<boolean>;
  existsById(id: string): Promise<boolean>;
}
