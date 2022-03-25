export type PurchaseOrderListDTOs = {
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
