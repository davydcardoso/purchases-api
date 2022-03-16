import { Either, right } from "@/core/logic/Either";
import { ProductsPropsDTOs } from "../../dtos/ProductsPropsDTOs";
import { ProductsMappers } from "../../mappers/ProductsMappers";
import { IProductsRepository } from "../../repositories/IProductsRepository";

type SearchMultipleFilteredProductsRequest = {
  data: string;
};

type SearchMultipleFilteredProductsResponse = Either<
  Error,
  SearchMultipleFilteredProductsResponseProps
>;

type SearchMultipleFilteredProductsResponseProps = {
  products: ProductsPropsDTOs[];
};

export class SearchMultipleFilteredProducts {
  constructor(private productsRepository: IProductsRepository) {}

  async perform({
    data,
  }: SearchMultipleFilteredProductsRequest): Promise<SearchMultipleFilteredProductsResponse> {
    const productsPersistence = await this.productsRepository.findFiltered(
      data
    );

    const products = productsPersistence.map((product) =>
      ProductsMappers.toDto(product)
    );

    return right({ products });
  }
}
