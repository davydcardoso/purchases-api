import { Either, right } from "@/core/logic/Either";
import { PurchaseOrderListDTOs } from "../../dtos/PurchaseOrderListDTOs";
import { IPurchasesRepository } from "../../repositories/IPurchasesRepository";

type GetMyListPurchasesRequest = {
  userId: string;
};

type GetMyListPurchasesResponse = Either<
  Error,
  GetMyListPurchasesResponseProps
>;

type GetMyListPurchasesResponseProps = {
  purchases: PurchaseOrderListDTOs[];
};

export class GetMyListPurchases {
  constructor(private purchasesRepository: IPurchasesRepository) {}

  async perform({
    userId,
  }: GetMyListPurchasesRequest): Promise<GetMyListPurchasesResponse> {
    const purchases = await this.purchasesRepository.findPurchaseList(userId);

    return right({ purchases });
  }
}
