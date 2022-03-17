import { Users } from "@/modules/users/domain/entities/users/users";
import { prisma } from "@/shared/infra/db/prisma/connection";
import { UsersMappers } from "@/modules/users/mappers/UsersMappers";
import { IUsersRepository } from "@/modules/users/repositories/IUsersRepository";

export class UsersRepository implements IUsersRepository {
  async create(user: Users): Promise<string> {
    const data = await UsersMappers.toPersistence(user);

    const usersCreated = await prisma.users.create({ data });

    return usersCreated.id;
  }

  async delete(id: string): Promise<void> {
    await prisma.users.delete({ where: { id } });
  }

  async exists(email: string): Promise<boolean> {
    const userExists = await prisma.users.findUnique({ where: { email } });

    return !!userExists;
  }

  async existsById(id: string): Promise<boolean> {
    const usersExists = await prisma.users.findUnique({ where: { id } });

    return !!usersExists;
  }

  async findByEmail(email: string): Promise<Users> {
    const users = await prisma.users.findUnique({ where: { email } });

    if (!users) {
      return null;
    }

    return UsersMappers.toDomain(users);
  }

  async findById(id: string): Promise<Users> {
    const users = await prisma.users.findUnique({ where: { id } });

    if (!users) {
      return null;
    }

    return UsersMappers.toDomain(users);
  }

  async findMany(): Promise<Users[]> {
    const users = await prisma.users.findMany({});

    return users.map((user) => UsersMappers.toDomain(user));
  }
}
