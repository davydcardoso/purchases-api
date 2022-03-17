import { PurchaseOrder } from "../domain/entities/purchaseOrder/purchaseOrder";
import { PurchaseOrder as PurchaseOrderPersistence } from "@prisma/client";

export class PurchasesOrderMappers {
  static toPersistence(raw: PurchaseOrder) {
    return {
      id: raw.id,
      usersId: raw.usersId,
      status: raw.status,
      purchaseDate: raw.purcheaseDate,
      purchaseTotal: raw.purchaseTotal,
    };
  }
}
