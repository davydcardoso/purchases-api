import { Controller } from "@/core/infra/Controller";
import { clientError, HttpResponse, ok } from "@/core/infra/HttpResponse";
import { fail } from "assert";
import { SearchMultipleFilteredProducts } from "./SearchMultipleFilteredProducts";

type SearchMultipleFilteredProductsControllerRequest = {
  data: string;
};

export class SearchMultipleFilteredProductsController implements Controller {
  constructor(
    private searchMultipleFilteredProducts: SearchMultipleFilteredProducts
  ) {}

  async handle(
    request: SearchMultipleFilteredProductsControllerRequest
  ): Promise<HttpResponse> {
    try {
      const { data } = request;

      const result = await this.searchMultipleFilteredProducts.perform({
        data,
      });

      if (result.isLeft()) {
        const error = result.value;

        switch (error.constructor) {
          default:
            return clientError(error);
        }
      }

      return ok(result.value);
    } catch (err) {
      return fail(err);
    }
  }
}
