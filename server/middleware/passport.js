import { Strategy } from 'passport-local';
import User from "../models/User.js";
import bcrypt from 'bcrypt';
import passport from 'passport';

const LocalStrategy = Strategy;

 
export function initializePassport(passport)
{
    const authenticateUser = async (email, password, done) => {
        const user = await User.findOne({ email: email });
    
        if (!user) {
            return done(null, false, { message: "No user found with this email address" });
        }
    
        try {
            if (await bcrypt.compare(password, user.password)) {
                return done(null, user);
            } else {
                return done(null, false, { message: "Incorrect password" });
            }
        } catch (e) {
            return done(e);
        }
    }
    
    passport.use(new LocalStrategy ({ usernameField: "email",passwordField: "password" },authenticateUser)); //
    
    passport.serializeUser((user, done) => {
        done(null, user);
        ///done(null, user);
    });
    
    passport.deserializeUser(async (id, done) => {
        try {
            const user = await User.findById(id);
            done(null, user);
        } catch (err) {
            done(err);
        }
    });
    
}

export function checkAuthenticated(req, res, next) {
    
if (req.isAuthenticated()) {
    return next();
}
return res.status(401).json({ message: "Unauthorized: User is not authenticated" });
}

