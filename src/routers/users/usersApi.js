import { Router } from "express";
import { sessionsRouter } from "./api/sessions.router.js";

export const usersApi = Router()
//usersApi.use('/users', register )
usersApi.use('/sessions', sessionsRouter)
