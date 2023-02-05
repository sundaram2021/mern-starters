import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
import User from "../models/User.js";
import Todo from "../models/Todo.js";

export const Home = async (req, res) => {
  const token = req.headers["x-access-token"];
  try {
    const match = jwt.verify(token, process.env.JWT_SECRET);
    const email = match.email;
    const user = await User.findOne({ email });

    return res.json({ status: "ok", firstName: user.firstName });
  } catch (err) {
    // req.session.message = "Please log in to access this page";
    return res.status(406).json({ message: "Internal server error" });
  }
};

export const postTodo = async (req, res) => {
  const { todo } = req.body;
  console.log(todo);
  console.log(req.url);

  if (!todo) {
    return res.status(406).json("Invalid todo");
  }

  const todoExist = await Todo.findOne({ todo });

  if (todoExist) {
    return res.status(404).json("Todo Already exists");
  }

  const newTodo = new Todo({
    todo,
  });

  await newTodo.save();

  return res.status(201).json({ message: "Todo is saved", savedTodo: todo });
};

export const getData = async (req, res) => {
  try {
    const models = await Todo.find(); // Retrieve all models from the database
    const todoModel = models.map((item) => item)
    // console.log(todoModel);
    return res.json({myTodos: todoModel}); // Send the models as a JSON response
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteTodo = async(req, res) => {
  try {
    const deletedItem = await Todo.findByIdAndDelete(req.params.id);
    if (!deletedItem) res.status(404).send("No item found");
    res.status(200).send("Item deleted successfully");
  } catch (error) {
    res.status(500).send(error.message);
  }
}


export const editTodo = async(req, res) => {
  try {
    const item = await Todo.findById(req.params.id);
    if (!item) return res.status(404).send("The item was not found.");

    item.todo = req.body.todo;
    await item.save();

    res.send(item);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
}