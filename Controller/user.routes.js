const express = require("express");
const { UserModel } = require("../models/user.model");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

const userRouter = express.Router();

userRouter.post("/signup", (req, res) => {
  const { name, email, password } = req.body;
  bcrypt.hash(password, 5, async function (err, hash) {
    if (err) {
      res.send({ msg: "something went wrong" });
    } else {
      const new_user = new UserModel({
        name,
        email,
        password: hash,
      });
      await new_user.save();
      res.send({ msg: "SignUp succefull" });
    }
  });
});

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user =await UserModel.findOne({ email });

  if (user) {
    const hashed_password = user.password;
    bcrypt.compare(password, hashed_password, function (err, result) {
      if (result) {
        const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY);
      
        res.send({ msg: "Login successfull", token: token });
      } else {
        res.send({ msg: "SignUp first" });
      }
    })
  } else {
    res.send({ msg: "Something went wrong" });
  }
});
module.exports = { userRouter };
