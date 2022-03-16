import { prisma } from "@/shared/infra/db/prisma/connection";
import { Products } from "@/modules/products/domain/entities/products/products";
import { IProductsRepository } from "@/modules/products/repositories/IProductsRepository";
import { ProductsMappers } from "@/modules/products/mappers/ProductsMappers";

export class ProductsRepository implements IProductsRepository {
  async findMany(): Promise<Products[]> {
    const products = await prisma.products.findMany();

    return products.map((product) => ProductsMappers.toDomain(product));
  }

  async findFiltered(data: string): Promise<Products[]> {
    const products = await prisma.products.findMany({
      where: {
        name: { contains: data },
        OR: {
          description: { contains: data },
        },
      },
    });

    return products.map((product) => ProductsMappers.toDomain(product));
  }
}
