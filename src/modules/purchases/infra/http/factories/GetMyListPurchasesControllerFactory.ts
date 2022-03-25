import { Controller } from "@/core/infra/Controller";
import { GetMyListPurchases } from "@/modules/purchases/useCases/GetMyListPurchases/GetMyListPurchases";
import { GetMyListPurchasesController } from "@/modules/purchases/useCases/GetMyListPurchases/GetMyListPurchasesController";
import { PurchasesOrderRepository } from "../../db/prisma/repositories/PurchasesOrderRepository";

export function makeGetMyListPurchasesController(): Controller {
  const prismaPurchasesOrderRepository = new PurchasesOrderRepository();

  const getMyListPurchases = new GetMyListPurchases(
    prismaPurchasesOrderRepository
  );

  const getMyListPurchasesController = new GetMyListPurchasesController(
    getMyListPurchases
  );

  return getMyListPurchasesController;
}
