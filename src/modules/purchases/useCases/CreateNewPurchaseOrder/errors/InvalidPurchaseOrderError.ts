import { UseCaseError } from "@/core/domain/errors/UseCaseError";

export class InvalidPurchaseOrderError extends Error implements UseCaseError {
  constructor() {
    super(`The purchase order is ivalid`);
    this.name = "InvalidPurchaseOrderError";
  }
}
