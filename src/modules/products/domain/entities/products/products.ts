import { Entity } from "@/core/domain/Entity";
import { Either, right } from "@/core/logic/Either";
import { Description } from "./description";
import { InvalidProductDescriptionValueError } from "./errors/InvalidProductDescriptionValueError";
import { InvalidProductsNameError } from "./errors/InvalidProductsNameError";
import { ValueProductsIsInvalidError } from "./errors/ValueProductsIsInvalidError";
import { Name } from "./name";
import { Value } from "./value";

type ProductsProps = {
  name: Name;
  description: Description;
  value: Value;
  discount: number;
};

export class Products extends Entity<ProductsProps> {
  get name() {
    return this.props.name;
  }

  get description() {
    return this.props.description;
  }

  get value() {
    return this.props.value;
  }

  get discount() {
    return this.props.discount;
  }

  private constructor(props: ProductsProps, id?: string) {
    super(props, id);
  }

  static create(
    props: ProductsProps,
    id?: string
  ): Either<
    | InvalidProductsNameError
    | InvalidProductDescriptionValueError
    | ValueProductsIsInvalidError,
    Products
  > {
    const products = new Products(props, id);

    return right(products);
  }
}
