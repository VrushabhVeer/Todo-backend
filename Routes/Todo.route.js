const { Router } = require("express");
const { TodoModel } = require("../Model/Todo.model");
const todoRouter = Router();

//get
todoRouter.get("/", async (req, res) => {
    const result = await TodoModel.find({ user_id: req.body.user_id });
    res.send(result);
});

//post
todoRouter.post("/create", async (req, res) => {
    const { taskname, status, tag, user_id } = req.body;
    const todo = new TodoModel({
        taskname,
        status,
        tag,
        user_id,
    });
    await todo.save();
    res.send(todo);
});

//patch
todoRouter.patch("/edit/:todoID", async (req, res) => {
    const { todoID } = req.params;
    try {
        const todo = await TodoModel.findOne({
            _id: todoID,
            user_id: req.body.user_id,
        });

        if (req.body.taskname) {
            todo.taskname = req.body.taskname;
        }

        if (req.body.status) {
            todo.status = req.body.status;
        }

        if (req.body.tag) {
            todo.tag = req.body.tag;
        }

        await todo.save();
        res.send(todo);
    } catch (error) {
        res.status(404);
        res.send({ error: "Todo found" });
    }
});

//delete
todoRouter.delete("/delete/:todoID", async (req, res) => {
    const { todoID } = req.params;
    const deletetodo = await TodoModel.findOneAndDelete({ _id: todoID, user_id: req.body.user_id });
    if(deletetodo) {
        res.send({msg : "deleted"});
    }else {
        res.send({ msg: "Todo not found" });
    }
});

module.exports = {
    todoRouter,
};
