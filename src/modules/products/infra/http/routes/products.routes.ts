import { adaptMiddleware } from "@/core/infra/adpters/ExpressMiddlewareAdapter";
import { adaptRoute } from "@/core/infra/adpters/ExpressRouteAdapter";
import { makeEnsureAuthenticatedMiddleware } from "@/shared/infra/http/factories/middlewares/EnsureAuthenticatedMiddlewareFactory";
import { Router } from "express";
import { makeFindAllProductsController } from "../factories/FindAllProductsControllerFactory";
import { makeSearchMultipleFilteredProductsController } from "../factories/SearchMultipleFilteredProductsControllerFactory";

const productsRoutes = Router();

productsRoutes.use(adaptMiddleware(makeEnsureAuthenticatedMiddleware()));

productsRoutes.get("/", adaptRoute(makeFindAllProductsController()));

productsRoutes.get(
  "/filter",
  adaptRoute(makeSearchMultipleFilteredProductsController())
);

export { productsRoutes };
