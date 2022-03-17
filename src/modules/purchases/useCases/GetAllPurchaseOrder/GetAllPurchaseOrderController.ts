import { Controller } from "@/core/infra/Controller";
import { clientError, fail, HttpResponse, ok } from "@/core/infra/HttpResponse";
import { GetAllPurchaseOrder } from "./GetAllPurchaseOrder";

type GetAllPurchaseOrderControllerRequest = {};

export class GetAllPurchaseOrderController implements Controller {
  constructor(private getAllPurchaseOrder: GetAllPurchaseOrder) {}

  async handle(
    request: GetAllPurchaseOrderControllerRequest
  ): Promise<HttpResponse> {
    try {
      const result = await this.getAllPurchaseOrder.perform({});

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
