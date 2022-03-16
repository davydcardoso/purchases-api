import { Entity } from "@/core/domain/Entity";
import { Either, right } from "@/core/logic/Either";

type PurchaseOrderProps = {
  usersId: string;
  status: number;
  purchaseDate: Date;
  purchaseTotal: number;
};

export class PurchaseOrder extends Entity<PurchaseOrderProps> {
  get usersId() {
    return this.props.usersId;
  }

  get status() {
    return this.props.status;
  }

  get purcheaseDate() {
    return this.props.purchaseDate;
  }

  get purchaseTotal() {
    return this.props.purchaseTotal;
  }

  private constructor(props: PurchaseOrderProps, id?: string) {
    super(props, id);
  }

  static create(
    props: PurchaseOrderProps,
    id?: string
  ): Either<Error, PurchaseOrder> {
    const purchaseOrder = new PurchaseOrder(props, id);

    return right(purchaseOrder);
  }
}
