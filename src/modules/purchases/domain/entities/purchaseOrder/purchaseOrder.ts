import { Entity } from "@/core/domain/Entity";
import { Either, right } from "@/core/logic/Either";

type PurchaseOrderProps = {
  usersId: string;
  status: number;
  purchaseDate: Date;
  purchaseTotal: number;
  fullName: string;
  phoneNumber: string;
  paymentMethod: string;
  promotionalCode: string;
  orderComments: string;
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

  get fullName() {
    return this.props.fullName;
  }

  get phoneNumber() {
    return this.props.phoneNumber;
  }

  get paymentMethod() {
    return this.props.paymentMethod;
  }

  get promotionalCode() {
    return this.props.promotionalCode;
  }

  get orderComments() {
    return this.props.orderComments;
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
