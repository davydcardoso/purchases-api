import { PurchaseItems } from "../domain/entities/purchaseItems/purchaseItems";
import { PurchaseOrder } from "../domain/entities/purchaseOrder/purchaseOrder";

export interface IPurchasesRepository {
  create(purchaseOrder: PurchaseOrder): Promise<void>;
  delete(id: string): Promise<void>;
  addItems(purchaseItems: PurchaseItems): Promise<void>;
}
