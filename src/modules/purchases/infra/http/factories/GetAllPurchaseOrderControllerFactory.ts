import { Controller } from "@/core/infra/Controller";
import { GetAllPurchaseOrder } from "@/modules/purchases/useCases/GetAllPurchaseOrder/GetAllPurchaseOrder";
import { GetAllPurchaseOrderController } from "@/modules/purchases/useCases/GetAllPurchaseOrder/GetAllPurchaseOrderController";
import { PurchasesOrderRepository } from "../../db/prisma/repositories/PurchasesOrderRepository";

export function makeGetAllPurchaseOrderController(): Controller {
  const prismaPurchaseRepository = new PurchasesOrderRepository();

  const getAllPurchaseOrder = new GetAllPurchaseOrder(prismaPurchaseRepository);

  const getAllPurchaseOrderController = new GetAllPurchaseOrderController(
    getAllPurchaseOrder
  );

  return getAllPurchaseOrderController;
}
