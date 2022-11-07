const { Router } = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../Model/User.model");
const userRouter = Router();
require("dotenv").config();

const key = process.env.SECRET_KEY;

//signup
userRouter.post("/signup", async (req, res) => {
    const { name, email, password } = req.body;
    const result = await UserModel.findOne({ email });
    if (result) {
        res.send({ msg: "email already exists" });
    } else {
        bcrypt.hash(password, 5, async function (err, hash) {
            if (err) {
                res.send({ msg: "something went wrong, please try again" });
            }

            const new_user = new UserModel({
                name: name,
                email: email,
                password: hash,
                IP: req.connection.remoteAddress,
            });
            await new_user.save();
            res.send({ msg: "Signup Successfull" });
        });
    }
});

//login
userRouter.post("/login", async (req, res) => {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });
    const user_id = user._id;

    const hash = user.password;
    bcrypt.compare(password, hash, async function (err, result) {
        if (err) {
            res.send({ msg: "Something went wrong, try again later" });
        }
        if (result) {
            const token = jwt.sign({ user_id }, key);
            res.send({ msg: "Login Successfull", token: token });
        } else {
            res.send({ msg: "Login Failed" });
        }
    });
});

module.exports = {
    userRouter,
};
