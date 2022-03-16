import { adaptRoute } from "@/core/infra/adpters/ExpressRouteAdapter";
import { Router } from "express";
import { makeAuthenticationsUsersController } from "../factories/AuthenticationsUsersControllerFactory";
import { makeCreateNewUsersAccountController } from "../factories/CreateNewUsersAccountControllerFactory";

const usersRoutes = Router();

usersRoutes.post("/", adaptRoute(makeCreateNewUsersAccountController()));

usersRoutes.post("/singin", adaptRoute(makeAuthenticationsUsersController()));

export { usersRoutes };
