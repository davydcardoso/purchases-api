import { prisma } from "@/shared/infra/db/prisma/connection";
import { PurchaseOrder } from "@/modules/purchases/domain/entities/purchaseOrder/purchaseOrder";
import { PurchasesOrderMappers } from "@/modules/purchases/mappers/PurchasesOrderMappers";
import { IPurchasesRepository } from "@/modules/purchases/repositories/IPurchasesRepository";
import { PurchaseItems } from "@/modules/purchases/domain/entities/purchaseItems/purchaseItems";
import { PurchasesItemsMappers } from "@/modules/purchases/mappers/PurchasesItemsMappers";
import { PurchaseAndItemsDTOs } from "@/modules/purchases/dtos/PurchaseOrderAndItemsDTOs";
import { PurchaseOrderListDTOs } from "@/modules/purchases/dtos/PurchaseOrderListDTOs";

export class PurchasesOrderRepository implements IPurchasesRepository {
  async create(purchaseOrder: PurchaseOrder): Promise<void> {
    const data = PurchasesOrderMappers.toPersistence(purchaseOrder);

    await prisma.purchaseOrder.create({ data });
  }

  async delete(id: string): Promise<void> {
    await prisma.purchaseOrder.delete({ where: { id } });
    await prisma.purchaseItems.deleteMany({ where: { purchaseOrderId: id } });
  }

  async addItems(purchaseItems: PurchaseItems): Promise<void> {
    const data = PurchasesItemsMappers.toPersistence(purchaseItems);

    await prisma.purchaseItems.create({ data });
  }

  async findOne(id: string): Promise<PurchaseAndItemsDTOs> {
    const purchase = await prisma.purchaseOrder.findUnique({
      where: { id },
      include: {
        PurchaseItems: {
          select: {
            productId: true,
            amount: true,
            numberOfItems: true,
            unitaryValue: true,
          },
        },
      },
    });

    return PurchasesOrderMappers.toPurchaseAndItemsDto(purchase);
  }

  async findMany(): Promise<PurchaseAndItemsDTOs[]> {
    const purchase = await prisma.purchaseOrder.findMany({
      include: {
        PurchaseItems: {
          select: {
            productId: true,
            amount: true,
            numberOfItems: true,
            unitaryValue: true,
          },
        },
      },
    });
    console.log(purchase);

    return purchase.map((purchase) =>
      PurchasesOrderMappers.toPurchaseAndItemsDto(purchase)
    );
  }

  async findPurchaseList(usersId: string): Promise<PurchaseOrderListDTOs[]> {
    const purchasesOrder = await prisma.purchaseOrder.findMany({
      where: { usersId },
    });

    return purchasesOrder.map((purchase) =>
      PurchasesOrderMappers.toDto(purchase)
    );
  }
}
