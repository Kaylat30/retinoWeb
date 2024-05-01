import bcrypt from "bcrypt"
import User from "../models/User.js"
import passport from "passport"

//register user
export const register = async (req, res) => {
  try {
      const { 
          firstname,
          lastname,
          email,
          password
      } = req.body;

      const salt = await bcrypt.genSalt();
      const passwordHash = await bcrypt.hash(password, salt); // encrypting password

      const newUser = new User({
          firstname,
          lastname,
          email,
          password: passwordHash // we store the encypted password when new user registers
      });

      const savedUser = await newUser.save();
      res.setHeader('Content-Type', 'application/json');
      res.status(201).json({ message: "User registered successfully",user: savedUser});
  } catch (err) {
      // Send an error response with the error message
      res.status(500).json({ error: err.message });
  }
};


// Logging in
export const login = (req, res, next) => {

    passport.authenticate('local', (err, user, info) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      if (!user) {
        return res.status(400).json({ error: 'Invalid credentials' });
      }
   
      req.logIn(user, async(err) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        }        
 
      // res.cookie('firstname', JSON.stringify({firstname:user.firstname}), {
      //   maxAge: 60000, 
      //   secure: true,
      //   sameSite: 'none'  
      // }); 
         
        res.status(200).json({success : true , message: "logged in successfully" , firstName: user.firstname });
      });
    
    })(req, res, next); 
};
  

export const logout = (req, res) => {
    req.logout(function(err) {
        if (err) { return next(err); }
        res.status(200).json({ message: 'Logged out successfully' });
        }) 
   
};
