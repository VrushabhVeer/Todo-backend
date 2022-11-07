const mongoose = require("mongoose");

const todosSchema = new mongoose.Schema({
  taskname: { type: String, required: true },
  status: { type: String, required: true },
  tag: { type: String, required: true },
  user_id: { type: String, required: true }
});

const TodoModel = mongoose.model("todo", todosSchema);

module.exports = {
  TodoModel,
};
