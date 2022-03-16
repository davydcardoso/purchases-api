import { PurchaseItems } from "../domain/entities/purchaseItems/purchaseItems";
import { PurchaseItems as PurchaseItemsPersistence } from "@prisma/client";

export class PurchasesItemsMappers {
  static toPersistence(raw: PurchaseItems) {
    return {
      productId: raw.productId,
      purchaseOrderId: raw.purchaseOrderId,
      numberOfItems: raw.numberOfItems,
      amount: raw.amount,
      unitaryValue: raw.unitaryValue,
    };
  }
}
