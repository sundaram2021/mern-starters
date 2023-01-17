import express from "express";
import connect from "./database/mongodb.js";
import bodyParser from "body-parser";
import cors from "cors";
import TransactionApi from "./routes/TransactionsApi.js";


const PORT = 9090;
const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.use('/transaction', TransactionApi)

connect()

app.listen(PORT, () => console.log(`server is running at ${PORT}...`));

// 5o4QRFVzCIuGbX6L    mern-stack

//mongodb+srv://mern-stack:<password>@cluster0.yza8k0o.mongodb.net/?retryWrites=true&w=majority
