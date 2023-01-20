import { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
// import Transaction from "../models/Transaction.js";
import User from "../models/User.js";
// import router from "./TransactionsApi.js";

const router = Router();

router.post("/register", async (req, res) => {
  //get all form data
  const { email, firstName, lastName, password } = req.body;
  // check if user exists with same email
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(406).json({ message: "User already exists" });
    return;
  }
  // hash the password
  const saltRounds = 10;
  const salt = await bcrypt.genSaltSync(saltRounds);
  const hashedPassword = await bcrypt.hashSync(password, salt);
  const user = await User({
    email,
    firstName,
    lastName,
    password: hashedPassword,
  });
  const savedUser = await user.save();
  console.log(savedUser);

  // store the password

  res.status(201).json({ message: "User is registered" });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  // console.log(email);
  const user = await User.findOne({ email });
  if (!user) {
    res.status(406).json({ message: "user is not registered" });
    return;
  }

  const matchPassword = await bcrypt.compare(password, user.password);

  if (!matchPassword) {
    // console.log(matchPassword);
    res.status(406).json({ message: "Password not Found" });
    return;
  }

  // create JWT token
  const payload = {
    username: email,
    id: user._id,
  };
  const token = jwt.sign(payload, process.env.JWT_SECRET);
  res.json({ message: "Sucessfully logged in", token });
  // console.log(token);
});

export default router;
