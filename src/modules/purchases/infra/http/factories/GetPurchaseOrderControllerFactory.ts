import { Controller } from "@/core/infra/Controller";
import { GetPurchaseOrder } from "@/modules/purchases/useCases/GetPurchaseOrder/GetPurchaseOrder";
import { GetPurchaseOrderController } from "@/modules/purchases/useCases/GetPurchaseOrder/GetPurchaseOrderController";
import { PurchasesOrderRepository } from "../../db/prisma/repositories/PurchasesOrderRepository";

export function makeGetPurchaseOrderController(): Controller {
  const prismaPurchaseRespository = new PurchasesOrderRepository();

  const getPurchaseOrder = new GetPurchaseOrder(prismaPurchaseRespository);

  const getPurchaseOrderController = new GetPurchaseOrderController(
    getPurchaseOrder
  );

  return getPurchaseOrderController;
}
