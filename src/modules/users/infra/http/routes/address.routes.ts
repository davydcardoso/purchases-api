import { adaptMiddleware } from "@/core/infra/adpters/ExpressMiddlewareAdapter";
import { adaptRoute } from "@/core/infra/adpters/ExpressRouteAdapter";
import { makeEnsureAuthenticatedMiddleware } from "@/shared/infra/http/factories/middlewares/EnsureAuthenticatedMiddlewareFactory";
import { Router } from "express";
import { makeAddAddressInUsersAlreadyRegisteredController } from "../factories/AddAddressInUsersAlreadyRegisteredControllerFactory";
import { makeCreateAlloweredZipCodesController } from "../factories/CreateAlloweredZipCodesControllerFactory";

const addressRoutes = Router();

addressRoutes.post(
  "/",
  adaptRoute(makeAddAddressInUsersAlreadyRegisteredController())
);

addressRoutes.use(adaptMiddleware(makeEnsureAuthenticatedMiddleware(true)));

addressRoutes.post(
  "/allowed-zipcode",
  adaptRoute(makeCreateAlloweredZipCodesController())
);

export { addressRoutes };
