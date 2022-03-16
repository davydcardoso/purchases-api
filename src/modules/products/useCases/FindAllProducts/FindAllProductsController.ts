import { Controller } from "@/core/infra/Controller";
import { clientError, fail, HttpResponse, ok } from "@/core/infra/HttpResponse";
import { FindAllProducts } from "./FindAllProducts";

type FindAllProductsControllerRequest = {};

export class FindAllProductsController implements Controller {
  constructor(private findAllProducts: FindAllProducts) {}

  async handle(
    request: FindAllProductsControllerRequest
  ): Promise<HttpResponse> {
    try {
      const {} = request;

      const result = await this.findAllProducts.perform({});

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
