import { Either, left, right } from "@/core/logic/Either";
import { IProductsRepository } from "@/modules/products/repositories/IProductsRepository";
import { randomUUID } from "crypto";
import { PurchaseItems } from "../../domain/entities/purchaseItems/purchaseItems";
import { PurchaseOrder } from "../../domain/entities/purchaseOrder/purchaseOrder";
import { IPurchasesRepository } from "../../repositories/IPurchasesRepository";
import { InvalidPurchaseOrderError } from "./errors/InvalidPurchaseOrderError";
import { ProductIsNotExistsInSystemError } from "./errors/ProductIsNotExistsInSystemError";

type CreateNewPurchaseOrderRequest = {
  userId: string;
  purchaseDate: Date;
  purchaseTotal: number;
  fullName: string;
  phoneNumber: string;
  email: string;
  paymentMethod: string;
  promotionalCode?: string;
  orderComments?: string;
  products: ProductsProps[];
};

type ProductsProps = {
  productId: string;
  numberOfItems: number;
  unitaryValue: number;
  amount: number;
};

type CreateNewPurchaseOrderResponse = Either<
  Error,
  CreateNewPurchaseOrderResponseProps
>;

type CreateNewPurchaseOrderResponseProps = {
  purchaseId?: string;
};

export class CreateNewPurchaseOrder {
  constructor(
    private purchasesRepository: IPurchasesRepository,
    private productsRepository: IProductsRepository
  ) {}

  async perform({
    userId,
    purchaseDate,
    purchaseTotal,
    fullName,
    phoneNumber,
    email,
    paymentMethod,
    promotionalCode,
    orderComments,
    products,
  }: CreateNewPurchaseOrderRequest): Promise<CreateNewPurchaseOrderResponse> {
    const purchaseId: string = randomUUID();

    const purchaseOrderOrError = PurchaseOrder.create(
      {
        usersId: userId,
        status: 0,
        fullName,
        orderComments,
        paymentMethod,
        phoneNumber,
        promotionalCode,
        purchaseTotal: purchaseTotal,
        purchaseDate: new Date(purchaseDate),
      },
      purchaseId
    );

    const purchaseItems: PurchaseItems[] = products.map(
      ({ amount, numberOfItems, productId, unitaryValue }) => {
        const purchaseItemsOrError = PurchaseItems.create({
          productId,
          purchaseOrderId: purchaseId,
          amount,
          numberOfItems,
          unitaryValue,
        });

        if (purchaseItemsOrError.isLeft()) {
          return null;
        }

        return purchaseItemsOrError.value;
      }
    );

    if (purchaseOrderOrError.isLeft()) {
      return left(new InvalidPurchaseOrderError());
    }

    const purchase = purchaseOrderOrError.value;

    await this.purchasesRepository.create(purchase);

    for await (const items of purchaseItems) {
      const existsProducts = await this.productsRepository.exists(
        items.productId
      );

      if (!existsProducts) {
        await this.purchasesRepository.delete(purchaseId);

        return left(new ProductIsNotExistsInSystemError());
      }

      await this.purchasesRepository.addItems(items);
    }

    return right({ purchaseId });
  }
}
