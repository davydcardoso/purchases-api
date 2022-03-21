import { PaymentsMethod } from "../domain/entities/paymentsMethod/paymentsMethod";
import { PaymentsMethosDTOs } from "../dtos/PaymentsMethodDTOs";

export interface ITypePaymentsMethodRepository {
  exists(userId: string, type: string): Promise<boolean>;
  create(paymentsMethod: PaymentsMethod): Promise<void>;
  findMany(userId: string): Promise<PaymentsMethosDTOs[]>;
  existsDefaultMethodPayment(userId: string): Promise<boolean>;
}
