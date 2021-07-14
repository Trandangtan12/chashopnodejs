const User = require("../models/user");
import jwt from "jsonwebtoken";
const expressJwt = require("express-jwt");
import dotenv from "dotenv";
dotenv.config();

export const signup = (req, res) => {
  const user = new User(req.body);
  user.save((error, user) => {
    if (error) {
      return res.status(400).json({
        error: "Không thể đăng kí được tài khoản",
      });
    }
    user.salt = undefined;
    user.hashed_password = undefined;
    res.json({ user });
  });
};

export const signin = (req, res) => {
  const { email, password } = req.body;
  if (email && password) {
    User.findOne({ email }, (error, user) => {
      if (error || !user) {
        return res.status(400).json({
          error: "User with that email does not exist, Please sigup",
        });
      }
      if (!user.authenticate(password)) {
        return res.status(401).json({
          error: "Email and password not match",
        });
      }
      const token = jwt.sign(
        { _id: user._id, role: user.role },
        process.env.JWT_SECRET
      );
      res.cookie("t", token, { expire: new Date() + 999 });
      const { _id, name, email, role, image } = user;
      return res.json(
        {
          token,
          user: {
          id: _id,
          email: email,
          name: name,
          role: role,
          image: image,
          }
        },
      );
    });
  }
};
export const signout = (req, res) => {
  res.clearCookie("t");
  res.json({
    message: "Signout Success",
  });
};
export const requireSignin = expressJwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
  userProperty: "auth",
});

export const isAuth = (req, res, next) => {
  let user = req.profile && req.auth && req.profile._id == req.auth._id;
  if (!user) {
    return res.status(403).json({
      error: "Access Denied",
    });
  }
  next();
};

export const isAdmin = (req, res, next) => {
  if (req.profile.role === 0) {
    return res.status(403).json({
      error: "Admin resource! Access Denined",
    });
  }
  next();
};
