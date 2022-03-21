import { PaymentsMethod } from "@/modules/users/domain/entities/paymentsMethod/paymentsMethod";
import { PaymentsMethosDTOs } from "@/modules/users/dtos/PaymentsMethodDTOs";
import { PaymentMethodMapper } from "@/modules/users/mappers/PaymentMethodMapper";
import { ITypePaymentsMethodRepository } from "@/modules/users/repositories/ITypePaymentsMethodRepository";
import { prisma } from "@/shared/infra/db/prisma/connection";

export class TypePaymentsMethodRepository
  implements ITypePaymentsMethodRepository
{
  async exists(userId: string, type: string): Promise<boolean> {
    const exists = await prisma.paymentsMethod.findFirst({
      where: { userId, type },
    });

    return !!exists;
  }

  async create(paymentsMethod: PaymentsMethod): Promise<void> {
    const data = PaymentMethodMapper.toPersistence(paymentsMethod);

    await prisma.paymentsMethod.create({ data });
  }

  async findMany(userId: string): Promise<PaymentsMethosDTOs[]> {
    const paymentsMethods = await prisma.paymentsMethod.findMany({
      where: { userId },
    });

    return paymentsMethods.map((payments) =>
      PaymentMethodMapper.toDto(payments)
    );
  }

  async existsDefaultMethodPayment(userId: string): Promise<boolean> {
    const exists = await prisma.paymentsMethod.findFirst({
      where: { userId, isDefault: true },
    });

    return !!exists;
  }
}
