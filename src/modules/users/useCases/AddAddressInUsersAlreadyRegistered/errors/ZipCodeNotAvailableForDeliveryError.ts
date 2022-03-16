import { UseCaseError } from "@/core/domain/errors/UseCaseError";

export class ZipCodeNotAvailableForDeliveryError
  extends Error
  implements UseCaseError
{
  constructor() {
    super("We do not have deliveries for this zip code.");
    this.name = "ZipCodeNotAvailableForDeliveryError";
  }
}
