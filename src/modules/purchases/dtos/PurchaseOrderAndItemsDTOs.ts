export type PurchaseAndItemsDTOs = {
  id: string;
  usersId: string;
  status: number;
  purchaseDate: Date;
  purchaseTotal: number;
  createdAt: Date;
  PurchaseItems: PurchaseItemsProps[];
};

export type PurchaseItemsProps = {
  productId: string;
  amount: number;
  numberOfItems: number;
  unitaryValue: number;
};
