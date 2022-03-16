import { prisma } from "@/shared/infra/db/prisma/connection";
import { hash } from "bcryptjs";

async function main() {
  await prisma.users.create({
    data: {
      isAdmin: true,
      name: "Administrador Mercado Quintal",
      email: "adm@mercadoquintal.com",
      password: await hash("123456", 8),
    },
  });
}

main();
