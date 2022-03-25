import { PurchaseOrder } from "../domain/entities/purchaseOrder/purchaseOrder";
import { PurchaseOrder as PurchaseOrderPersistence } from "@prisma/client";
import { PurchaseAndItemsDTOs } from "../dtos/PurchaseOrderAndItemsDTOs";
import { PurchaseOrderListDTOs } from "../dtos/PurchaseOrderListDTOs";

type PurchaseAndItemsProps = PurchaseOrderPersistence & {
  PurchaseItems: {
    productId: string;
    numberOfItems: number;
    unitaryValue: number;
    amount: number;
  }[];
};

export class PurchasesOrderMappers {
  static toPersistence(raw: PurchaseOrder) {
    return {
      id: raw.id,
      usersId: raw.usersId,
      status: raw.status,
      purchaseDate: raw.purcheaseDate,
      purchaseTotal: raw.purchaseTotal,
      fullName: raw.fullName,
      orderComments: raw.orderComments,
      paymentMethod: raw.paymentMethod,
      phoneNumber: raw.phoneNumber,
      promotionalCode: raw.promotionalCode,
    };
  }

  static toPurchaseAndItemsDto(
    raw: PurchaseAndItemsProps
  ): PurchaseAndItemsDTOs {
    return {
      id: raw.id,
      usersId: raw.usersId,
      status: raw.status,
      purchaseDate: raw.purchaseDate,
      purchaseTotal: 105,
      createdAt: raw.createdAt,
      PurchaseItems: raw.PurchaseItems.map((items) => {
        return { ...items };
      }),
    };
  }

  static toDto(raw: PurchaseOrderPersistence): PurchaseOrderListDTOs {
    return { ...raw };
  }
}
