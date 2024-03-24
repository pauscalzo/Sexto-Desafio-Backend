import bcrypt from "bcrypt"
import passport from "passport"

const createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10))
const isValidatePassword = (user, password) => bcrypt.compareSync(password, user.password)

const passportCall = (strategy) => {
    return (req, res, next) => {
        passport.authenticate(strategy, function (err, user, info) {
            if (err) {
                return next(err);
            }
            if (!user) {
                return res
                    .status(401)
                    .send({ error: info.messages ? info.messages : info.toString()});
            }

            req.user = user;
            next();
                
        })(req, res, next);
    }
}

export default { createHash, isValidatePassword, passportCall };