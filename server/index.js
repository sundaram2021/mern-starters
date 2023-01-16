import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import Transaction from "./models/Transaction.js";

const PORT = 9090;
const app = express();

app.use(cors());
app.use(bodyParser.json());

await mongoose.connect(
  "mongodb+srv://mern-stack:5o4QRFVzCIuGbX6L@cluster0.yza8k0o.mongodb.net/?retryWrites=true&w=majority"
);
console.log("server is connected to mongodb database...");

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.get("/transaction", async (req, res) => {
  const transaction = await Transaction.find({}).sort({ createdAt: -1 });
  res.json({ data: transaction });
//   console.log(transaction);
});

app.post("/transaction", async (req, res) => {
  const { amount, description, date } = req.body;
  const transaction = new Transaction({
    amount,
    description,
    date,
  });
  await transaction.save();
  res.json({ message: "transaction complete" });
});

app.listen(PORT, () => console.log(`server is running at ${PORT}...`));

// 5o4QRFVzCIuGbX6L    mern-stack

//mongodb+srv://mern-stack:<password>@cluster0.yza8k0o.mongodb.net/?retryWrites=true&w=majority
