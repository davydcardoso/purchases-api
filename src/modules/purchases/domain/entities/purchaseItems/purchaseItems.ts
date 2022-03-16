import { Entity } from "@/core/domain/Entity";
import { Either, right } from "@/core/logic/Either";

type PurchaseItemsProps = {
  purchaseOrderId: string;
  productId: string;
  numberOfItems: number;
  unitaryValue: number;
  amount: number;
};

export class PurchaseItems extends Entity<PurchaseItemsProps> {
  get purchaseOrderId() {
    return this.props.purchaseOrderId;
  }

  get productId() {
    return this.props.productId;
  }

  get numberOfItems() {
    return this.props.numberOfItems;
  }

  get unitaryValue() {
    return this.props.unitaryValue;
  }

  get amount() {
    return this.props.amount;
  }

  private constructor(props: PurchaseItemsProps, id?: string) {
    super(props, id);
  }

  static create(
    props: PurchaseItemsProps,
    id?: string
  ): Either<Error, PurchaseItems> {
    const purchaseItems = new PurchaseItems(props, id);

    return right(purchaseItems);
  }
}
