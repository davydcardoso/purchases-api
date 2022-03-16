import { productsRoutes } from "@/modules/products/infra/http/routes/products.routes";
import { purchasesRoutes } from "@/modules/purchases/infra/http/routes/purchases.routes";
import { addressRoutes } from "@/modules/users/infra/http/routes/address.routes";
import { usersRoutes } from "@/modules/users/infra/http/routes/users.routes";
import { Router } from "express";

const routes = Router();

routes.use("/users", usersRoutes);
routes.use("/address", addressRoutes);
routes.use("/products", productsRoutes);
routes.use("/purchases", purchasesRoutes);

export { routes };
