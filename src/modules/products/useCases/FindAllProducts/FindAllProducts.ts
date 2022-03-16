import { Either, right } from "@/core/logic/Either";
import { Products } from "../../domain/entities/products/products";
import { ProductsPropsDTOs } from "../../dtos/ProductsPropsDTOs";
import { ProductsMappers } from "../../mappers/ProductsMappers";
import { IProductsRepository } from "../../repositories/IProductsRepository";

type FindAllProductsRequest = {};

type FindAllProductsResponse = Either<Error, FindAllProductsResponseProps>;

type FindAllProductsResponseProps = {
  products: ProductsPropsDTOs[];
};

export class FindAllProducts {
  constructor(private productsRepository: IProductsRepository) {}

  async perform({}: FindAllProductsRequest): Promise<FindAllProductsResponse> {
    const productsPersistence = await this.productsRepository.findMany();

    const products = productsPersistence.map((product) =>
      ProductsMappers.toDto(product)
    );

    return right({ products });
  }
}
