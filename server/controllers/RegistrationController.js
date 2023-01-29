import User from "../models/User.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const register = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  if (!email || !firstName || !lastName || !password) {
    return res.status(204).json({ message: "Information is not filled" });
  }

  const userExist = await User.findOne({ email });

  if (userExist) {
    return res.status(406).json({ message: "User is already exist" });
  }

  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = new User({
    firstName,
    lastName,
    email,
    password: hashedPassword,
  });

  await user.save();

  res.status(201).json({ message: "User is registered" });
  console.log(email);
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(404).json({ message: "Invalid input" });
    }

    const userExist = await User.findOne({ email });

    if (!userExist) {
      return res.status(406).json({ message: "User not registered" });
    }

    const matchPassword = bcrypt.compare(password, userExist.password);

    if (!matchPassword) {
      return res.status(208).json({ message: "Password not match" });
    }

    const payload = {
      email,
      password,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET);
    console.log(email, password);
    return res.json({ message: "Logged in" });
  } catch (err) {
    return res.status(408).json("Internal server error");
  }
};
