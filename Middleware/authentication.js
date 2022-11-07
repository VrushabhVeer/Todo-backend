const jwt = require("jsonwebtoken");
require("dotenv").config();
const key = process.env.SECRET_KEY;

const authentication = (req, res, next) => {
    const token = req.headers?.authorization?.split(" ")[1];

    if (!token) {
        res.send({ msg: "Please login" });
    }
    const decoded = jwt.verify(token, key);
    const user_id = decoded.user_id;
    if (decoded) {
        req.body.user_id = user_id;
        next();
    } else {
        res.send({ msg: "Plase login" });
    }
};

module.exports = {
    authentication,
};
