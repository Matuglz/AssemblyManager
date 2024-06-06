import session from 'express-session'
import connectMongo from 'connect-mongo'
import { SECRET_COOKIE_KEY,MONGODB_ATLAS_ACCESS_STRING } from '../config/config.js'


const store = connectMongo.create({
  mongoUrl: MONGODB_ATLAS_ACCESS_STRING,
  ttl: 60 * 60 * 24
})

export const sessions = session({
  store,
  secret: SECRET_COOKIE_KEY,
  resave: false,
  saveUninitialized: false
})