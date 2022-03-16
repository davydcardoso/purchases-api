import { Controller } from "@/core/infra/Controller";
import { created, fail, HttpResponse } from "@/core/infra/HttpResponse";

export class CreateNewPurchaseOrderController implements Controller {
  async handle(request: any): Promise<HttpResponse> {
    try {
      return created();
    } catch (err) {
      return fail(err);
    }
  }
}
