import { prisma } from "@/shared/infra/db/prisma/connection";

async function main() {
  await prisma.products.createMany({
    data: [
      {
        name: "Bis Branco",
        description: "Product description 1",
        value: 10.5,
        discount: 0.1,
        image:
          "https://media.cotabest.com.br/media/sku/bis-branco-126g-lacta-un.png",
      },
      {
        name: "Redbull",
        description: "Product description 2",
        value: 101.5,
        discount: 0.1,
        image:
          "https://media.cotabest.com.br/media/sku/energetico-lata-250ml-red-bull-un.png",
      },
      {
        name: "Agua de Coco",
        description: "Product description 3",
        value: 200.5,
        discount: 0.1,
        image:
          "https://media.cotabest.com.br/media/sku/agua-de-coco-tetra-pak-1litro-sococo-un.png",
      },
      {
        name: "Azzoz Integral",
        description: "Product description 4",
        value: 23.5,
        discount: 0.1,
        image:
          "https://media.cotabest.com.br/media/sku/arroz-integral-tipo-1-pacote-1kg-camil-pct.jpg",
      },
      {
        name: "Arroz",
        description: "Product description 5",
        value: 10.5,
        discount: 0.1,
        image:
          "https://media.cotabest.com.br/media/sku/arroz-integral-preto-negro-pacote-1kg-paiol-pct.png",
      },
      {
        name: "Kit Kat",
        description: "Product description 6",
        value: 26.5,
        discount: 0.1,
        image:
          "https://media.cotabest.com.br/media/sku/chocolate-wafer-chocolate-ao-leite-415g-nestlekit-kat-un.jpg",
      },
      {
        name: "Coca cola",
        description: "Product description 7",
        value: 200.54,
        discount: 0.1,
        image:
          "https://media.cotabest.com.br/media/sku/refrigerante-coca-cola-pet-2litros-coca-cola-un.png",
      },
    ],
  });
}

main();
