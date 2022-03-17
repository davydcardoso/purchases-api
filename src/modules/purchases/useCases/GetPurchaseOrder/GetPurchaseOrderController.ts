import { Controller } from "@/core/infra/Controller";
import { clientError, fail, HttpResponse, ok } from "@/core/infra/HttpResponse";
import { GetPurchaseOrder } from "./GetPurchaseOrder";

type GetPurchaseOrderControllerRequest = {
  userId: string;
  purchaseId: string;
};

export class GetPurchaseOrderController implements Controller {
  constructor(private getPurchaseOrder: GetPurchaseOrder) {}

  async handle(
    request: GetPurchaseOrderControllerRequest
  ): Promise<HttpResponse> {
    try {
      const { userId, purchaseId } = request;

      const result = await this.getPurchaseOrder.perform({
        userId,
        purchaseId,
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
