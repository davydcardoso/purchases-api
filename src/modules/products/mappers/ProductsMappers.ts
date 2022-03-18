import { Products as ProductsPersistence } from "@prisma/client";
import { Description } from "../domain/entities/products/description";
import { Name } from "../domain/entities/products/name";
import { Products } from "../domain/entities/products/products";
import { Value } from "../domain/entities/products/value";
import { ProductsPropsDTOs } from "../dtos/ProductsPropsDTOs";

export class ProductsMappers {
  static toDomain(raw: ProductsPersistence): Products {
    const nameOrError = Name.create(raw.name);
    const descriptionOrError = Description.create(raw.description);
    const valueOrError = Value.create(raw.value);

    if (nameOrError.isLeft()) {
      throw nameOrError.value;
    }

    if (descriptionOrError.isLeft()) {
      throw descriptionOrError.value;
    }

    if (valueOrError.isLeft()) {
      throw valueOrError.value;
    }

    const productsOrError = Products.create(
      {
        name: nameOrError.value,
        description: descriptionOrError.value,
        value: valueOrError.value,
        discount: raw.discount,
        image: raw.image,
      },
      raw.id
    );

    if (productsOrError.isLeft()) {
      return null;
    }

    return productsOrError.value;
  }

  static toDto(raw: Products): ProductsPropsDTOs {
    return {
      id: raw.id,
      name: raw.name.value,
      description: raw.description.value,
      value: raw.value.value,
      discount: raw.discount,
      image: raw.image,
    };
  }
}
