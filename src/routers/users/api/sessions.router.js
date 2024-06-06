import { Router } from "express";
import { loginController } from "../../../controllers/usersControllers/usersControllers.js";

export const sessionsRouter = Router()

sessionsRouter.post('/', loginController)