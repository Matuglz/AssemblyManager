import passport from "passport";

export function loginController(req, res, next) {
    
    passport.authenticate('loginLocal', (err, user, info) => {
        if (err) {
            return next(err)
        }
        if (!user) {
            return res.status(401).json({ message: info ? info.message : 'Login failed' });
        }
        req.login(user, (error) => {
            if (error) {
                return next(error);
            }
            res.send(JSON.stringify(req.user));
        });
    })(req, res, next);
}