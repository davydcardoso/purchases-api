import { Controller } from "@/core/infra/Controller";
import { FindAllProducts } from "@/modules/products/useCases/FindAllProducts/FindAllProducts";
import { FindAllProductsController } from "@/modules/products/useCases/FindAllProducts/FindAllProductsController";
import { ProductsRepository } from "../../db/prisma/repositories/ProductsRepository";

export function makeFindAllProductsController(): Controller {
  const prismaProductsRepository = new ProductsRepository();

  const findAllProducts = new FindAllProducts(prismaProductsRepository);

  const findAllProductsController = new FindAllProductsController(
    findAllProducts
  );

  return findAllProductsController;
}
