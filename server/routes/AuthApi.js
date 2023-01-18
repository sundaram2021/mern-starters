import { Router } from "express";
import bcrypt from "bcrypt";
import Transaction from "../models/Transaction.js";
import User from "../models/User.js";
import router from "./TransactionsApi.js";

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
  const savedUser = user.save();
  console.log(savedUser);

  // store the password

  res.status(201).json({ message: "User is registered" });
});

export default router;
