import { Controller } from "@/core/infra/Controller";
import { ProductsRepository } from "@/modules/products/infra/db/prisma/repositories/ProductsRepository";
import { CreateNewPurchaseOrder } from "@/modules/purchases/useCases/CreateNewPurchaseOrder/CreateNewPurchaseOrder";
import { CreateNewPurchaseOrderController } from "@/modules/purchases/useCases/CreateNewPurchaseOrder/CreateNewPurchaseOrderController";
import { PurchasesOrderRepository } from "../../db/prisma/repositories/PurchasesOrderRepository";

export function makeCreateNewPurchaseOrderController(): Controller {
  const prismaPurchasesRepository = new PurchasesOrderRepository();
  const prismaProductsRepository = new ProductsRepository();

  const createNewPurchaseOrder = new CreateNewPurchaseOrder(
    prismaPurchasesRepository,
    prismaProductsRepository
  );

  const createNewPurchaseOrderController = new CreateNewPurchaseOrderController(
    createNewPurchaseOrder
  );

  return createNewPurchaseOrderController;
}
