import { Controller } from "@/core/infra/Controller";
import { CreateNewPurchaseOrderController } from "@/modules/purchases/useCases/CreateNewPurchaseOrder/CreateNewPurchaseOrderController";

export function makeCreateNewPurchaseOrderController(): Controller {
  const createNewPurchaseOrderController =
    new CreateNewPurchaseOrderController();

  return createNewPurchaseOrderController;
}
