import { PurchaseItems } from "../domain/entities/purchaseItems/purchaseItems";
import { PurchaseOrder } from "../domain/entities/purchaseOrder/purchaseOrder";
import { PurchaseAndItemsDTOs } from "../dtos/PurchaseOrderAndItemsDTOs";

export interface IPurchasesRepository {
  create(purchaseOrder: PurchaseOrder): Promise<void>;
  delete(id: string): Promise<void>;
  addItems(purchaseItems: PurchaseItems): Promise<void>;
  findOne(id: string): Promise<PurchaseAndItemsDTOs>;
  findMany(): Promise<PurchaseAndItemsDTOs[]>;
}
