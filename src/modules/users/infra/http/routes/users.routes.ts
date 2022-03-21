import { adaptMiddleware } from "@/core/infra/adpters/ExpressMiddlewareAdapter";
import { adaptRoute } from "@/core/infra/adpters/ExpressRouteAdapter";
import { makeEnsureAuthenticatedMiddleware } from "@/shared/infra/http/factories/middlewares/EnsureAuthenticatedMiddlewareFactory";
import { Router } from "express";
import { makeAuthenticationsUsersController } from "../factories/AuthenticationsUsersControllerFactory";
import { makeCreateNewUsersAccountController } from "../factories/CreateNewUsersAccountControllerFactory";

const usersRoutes = Router();

usersRoutes.post("/", adaptRoute(makeCreateNewUsersAccountController()));

usersRoutes.post("/singin", adaptRoute(makeAuthenticationsUsersController()));

export { usersRoutes };
