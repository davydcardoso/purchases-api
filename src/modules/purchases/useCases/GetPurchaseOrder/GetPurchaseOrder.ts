import { Either, right } from "@/core/logic/Either";
import { PurchaseAndItemsDTOs } from "../../dtos/PurchaseOrderAndItemsDTOs";
import { IPurchasesRepository } from "../../repositories/IPurchasesRepository";

type GetPurchaseOrderRequest = {
  userId: string;
  purchaseId: string;
};

type GetPurchaseOrderResponse = Either<Error, GetPurchaseOrderResponseProps>;

type GetPurchaseOrderResponseProps = {
  purchase: PurchaseAndItemsDTOs;
};

export class GetPurchaseOrder {
  constructor(private purcharseRepository: IPurchasesRepository) {}

  async perform({
    userId,
    purchaseId,
  }: GetPurchaseOrderRequest): Promise<GetPurchaseOrderResponse> {
    const purchase = await this.purcharseRepository.findOne(purchaseId);

    return right({ purchase });
  }
}
