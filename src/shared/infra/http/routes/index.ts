import { Router } from "express";

import { productsRoutes } from "@/modules/products/infra/http/routes/products.routes";
import { purchasesRoutes } from "@/modules/purchases/infra/http/routes/purchases.routes";
import { addressRoutes } from "@/modules/users/infra/http/routes/address.routes";
import { paymentsRoutes } from "@/modules/users/infra/http/routes/payments.routes";
import { usersRoutes } from "@/modules/users/infra/http/routes/users.routes";

const routes = Router();

routes.use("/users", usersRoutes);
routes.use("/address", addressRoutes);
routes.use("/products", productsRoutes);
routes.use("/purchases", purchasesRoutes);
routes.use("/payments", paymentsRoutes);

export { routes };
