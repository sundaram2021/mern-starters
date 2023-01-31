import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
import User from "../models/User.js";

export const Home = async (req, res) => {
    const token = req.headers["x-access-token"];
  try {
    
    const match = jwt.verify(token, process.env.JWT_SECRET);
    const email = match.email;
    const user = await User.findOne({ email });

    return res.json({ status: "ok", email: user.email });
  } catch (err) {
    // req.session.message = "Please log in to access this page";
    return res.status(406).json({message: "Internal server error"});
  }
};
