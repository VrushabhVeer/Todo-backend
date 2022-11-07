const express = require("express");
const { connection } = require("./config/db");
const { authentication } = require("./Middleware/authentication");
const { todoRouter } = require("./Routes/Todo.route");
const { userRouter } = require("./Routes/User.route");
const cors = require("cors");
require("dotenv").config();

const port = process.env.PORT;
const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.send("Welcome to Todo");
});

app.use("/user", userRouter);
app.use(authentication);
app.use("/todos", todoRouter);

app.listen(port, () => {
    try {
        connection;
        console.log("Conncted to DB successfully");
    } catch (error) {
        console.log("Error to connected to DB");
        console.log(error);
    }
    console.log("Server is Running");
});
