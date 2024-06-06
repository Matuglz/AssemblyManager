import express  from "express"
import mongoose from "mongoose"
import { MONGODB_ATLAS_ACCESS_STRING } from "../config/config.js"
import { TEST } from "../test/test.js"
import { sessions } from "../middlewares/sessions.js"
import { passportInitialize, passportSession } from "../middlewares/authentication.js"
import { usersApi } from "../routers/users/usersApi.js"
export const APP = express()

//FROM EXPRESS
APP.use(express.json())
APP.use(express.urlencoded({extended:true}))

//CONNECT DATABASE MONGODB ATLAS
await mongoose.connect(MONGODB_ATLAS_ACCESS_STRING)

//PASSPORT AND SESSIONS
APP.use(sessions)
APP.use(passportInitialize, passportSession)

//SESSIONS
APP.use(usersApi)

APP.use(TEST)