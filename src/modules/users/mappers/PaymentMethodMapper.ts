import { PaymentsMethod } from "../domain/entities/paymentsMethod/paymentsMethod";
import { PaymentsMethod as PaymentMethodPersistence } from "@prisma/client";
import { PaymentsMethosDTOs } from "../dtos/PaymentsMethodDTOs";

export class PaymentMethodMapper {
  static toPersistence(raw: PaymentsMethod) {
    return {
      id: raw.id,
      userId: raw.userId,
      name: raw.name,
      type: raw.type.value,
      cardNumber: raw.cardNumber.value,
      cardValidate: raw.cardValidate,
      isDefault: raw.isDefault,
    };
  }

  static toDto(raw: PaymentMethodPersistence): PaymentsMethosDTOs {
    return {
      id: raw.id,
      userId: raw.userId,
      name: raw.name,
      type: raw.type,
      cardNumber: raw.cardNumber,
      cardValidate: raw.cardValidate,
    };
  }
}
