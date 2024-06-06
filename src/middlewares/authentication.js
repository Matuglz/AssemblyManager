import passport from "passport";
import { Strategy as localStrategy } from "passport-local";
import { usersService } from "../service/users/users.service.js";

passport.use('loginLocal', new localStrategy({
    usernameField: 'email'
}, async function verificationCallback(username, password, done) {
    try {
        console.log(username, password);
        const userData = await usersService.login(username, password)
        await usersService.updateLastConnection(userData, new Date().toString())
        done(null, userData)
    }
    catch (error) {
        done(error)
    }
}))


passport.serializeUser((user, next) => { next(null, user) })
passport.deserializeUser((user, next) => { next(null, user) })

export const passportInitialize = passport.initialize()
export const passportSession = passport.session()