import { Products } from "../domain/entities/products/products";

export interface IProductsRepository {
  findMany(): Promise<Products[]>;
  findFiltered(data: string): Promise<Products[]>;
  exists(id: string): Promise<boolean>;
}
