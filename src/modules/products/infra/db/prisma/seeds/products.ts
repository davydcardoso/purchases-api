import { prisma } from "@/shared/infra/db/prisma/connection";

async function main() {
  await prisma.products.createMany({
    data: [
      {
        name: "Product 1",
        description: "Product description 1",
        value: 10.5,
        discount: 0.1,
      },
      {
        name: "Product 2",
        description: "Product description 2",
        value: 101.5,
        discount: 0.1,
      },
      {
        name: "Product 3",
        description: "Product description 3",
        value: 200.5,
        discount: 0.1,
      },
      {
        name: "Product 4",
        description: "Product description 4",
        value: 23.5,
        discount: 0.1,
      },
      {
        name: "Product 5",
        description: "Product description 5",
        value: 10.5,
        discount: 0.1,
      },
      {
        name: "Product 6",
        description: "Product description 6",
        value: 26.5,
        discount: 0.1,
      },
      {
        name: "Product 7",
        description: "Product description 7",
        value: 200.54,
        discount: 0.1,
      },
    ],
  });
}

main();