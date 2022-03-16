import { prisma } from "@/shared/infra/db/prisma/connection";
import { PurchaseOrder } from "@/modules/purchases/domain/entities/purchaseOrder/purchaseOrder";
import { PurchasesOrderMappers } from "@/modules/purchases/mappers/PurchasesOrderMappers";
import { IPurchasesRepository } from "@/modules/purchases/repositories/IPurchasesRepository";
import { PurchaseItems } from "@/modules/purchases/domain/entities/purchaseItems/purchaseItems";
import { PurchasesItemsMappers } from "@/modules/purchases/mappers/PurchasesItemsMappers";

export class PurchasesOrderRepository implements IPurchasesRepository {
  async create(purchaseOrder: PurchaseOrder): Promise<void> {
    const data = PurchasesOrderMappers.toPersistence(purchaseOrder);

    await prisma.purchaseOrder.create({ data });
  }

  async addItems(purchaseItems: PurchaseItems): Promise<void> {
    const data = PurchasesItemsMappers.toPersistence(purchaseItems);

    await prisma.purchaseItems.create({ data });
  }
}
