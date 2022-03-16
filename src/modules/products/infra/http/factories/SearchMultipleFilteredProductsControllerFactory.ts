import { Controller } from "@/core/infra/Controller";
import { SearchMultipleFilteredProducts } from "@/modules/products/useCases/SearchMultipleFilteredProducts/SearchMultipleFilteredProducts";
import { SearchMultipleFilteredProductsController } from "@/modules/products/useCases/SearchMultipleFilteredProducts/SearchMultipleFilteredProductsController";
import { ProductsRepository } from "../../db/prisma/repositories/ProductsRepository";

export function makeSearchMultipleFilteredProductsController(): Controller {
  const prismaProductsRepository = new ProductsRepository();

  const searchMultipleFilteredProducts = new SearchMultipleFilteredProducts(
    prismaProductsRepository
  );

  const searchMultipleFilteredProductsController =
    new SearchMultipleFilteredProductsController(
      searchMultipleFilteredProducts
    );

  return searchMultipleFilteredProductsController;
}
