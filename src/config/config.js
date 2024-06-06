import { config as configDotenv } from "dotenv";
configDotenv()


export let MONGODB_ATLAS_ACCESS_STRING = process.env.MONGODB_ATLAS_ACCESS_STRING
export let SECRET_COOKIE_KEY = process.env.SECRET_COOKIE_KEY