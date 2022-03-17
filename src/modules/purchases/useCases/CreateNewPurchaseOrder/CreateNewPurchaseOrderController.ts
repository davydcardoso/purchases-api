import { Controller } from "@/core/infra/Controller";
import {
  clientError,
  created,
  fail,
  HttpResponse,
} from "@/core/infra/HttpResponse";
import { CreateNewPurchaseOrder } from "./CreateNewPurchaseOrder";

type CreateNewPurchaseOrderControllerRequest = {
  userId: string;
  purchaseDate: Date;
  purchaseTotal: number;
  products: RequestProductsProps[];
};

type RequestProductsProps = {
  productId: string;
  numberOfItems: number;
  unitaryValue: number;
  amount: number;
};

export class CreateNewPurchaseOrderController implements Controller {
  constructor(private createNewPurchaseOrder: CreateNewPurchaseOrder) {}

  async handle(
    request: CreateNewPurchaseOrderControllerRequest
  ): Promise<HttpResponse> {
    try {
      const { userId, purchaseDate, purchaseTotal, products } = request;

      const result = await this.createNewPurchaseOrder.perform({
        userId,
        purchaseDate,
        purchaseTotal,
        products,
      });

      if (result.isLeft()) {
        const error = result.value;

        switch (error.constructor) {
          default:
            return clientError(error);
        }
      }

      return created(result.value);
    } catch (err) {
      return fail(err);
    }
  }
}
