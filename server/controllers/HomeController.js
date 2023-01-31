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
