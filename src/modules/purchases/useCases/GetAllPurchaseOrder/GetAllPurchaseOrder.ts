import { Either, right } from "@/core/logic/Either";
import { PurchaseAndItemsDTOs } from "../../dtos/PurchaseOrderAndItemsDTOs";
import { IPurchasesRepository } from "../../repositories/IPurchasesRepository";

type GetAllPurchaseOrderRequest = {};

type GetAllPurchaseOrderResponse = Either<
  Error,
  GetAllPurchaseOrderResponseProps
>;

type GetAllPurchaseOrderResponseProps = {
  purchases: PurchaseAndItemsDTOs[];
};

export class GetAllPurchaseOrder {
  constructor(private purchaseRepository: IPurchasesRepository) {}

  async perform({}: GetAllPurchaseOrderRequest): Promise<GetAllPurchaseOrderResponse> {
    const purchases = await this.purchaseRepository.findMany();

    return right({ purchases });
  }
}
