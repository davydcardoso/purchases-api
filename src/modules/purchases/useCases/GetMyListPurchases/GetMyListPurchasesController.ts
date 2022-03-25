import { Controller } from "@/core/infra/Controller";
import { clientError, fail, HttpResponse, ok } from "@/core/infra/HttpResponse";
import { GetMyListPurchases } from "./GetMyListPurchases";

type GetMyListPurchasesControllerRequest = {
  userId: string;
};

export class GetMyListPurchasesController implements Controller {
  constructor(private getMyListPurchases: GetMyListPurchases) {}

  async handle(
    request: GetMyListPurchasesControllerRequest
  ): Promise<HttpResponse> {
    try {
      const { userId } = request;

      const result = await this.getMyListPurchases.perform({ userId });

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
