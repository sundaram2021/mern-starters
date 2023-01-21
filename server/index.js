import express from "express";
import connect from "./database/mongodb.js";
import bodyParser from "body-parser";
import cors from "cors";
import TransactionsApi from "./routes/TransactionsApi.js";
import AuthApi from "./routes/AuthApi.js";
import UserApi from "./routes/UserApi.js";
import passport from 'passport'
import passportConfig from "./config/passport.js";
import dotenv from 'dotenv';


dotenv.config()
const PORT = process.env.PORT;
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.get("/", (req, res) => {
  res.send("Hello world");
});

app.use('/transaction', TransactionsApi)
app.use('/auth', AuthApi)

app.use(passport.initialize());
passportConfig(passport)
app.use("/user", UserApi)

await connect()

app.listen(PORT, () => console.log(`server is running at ${PORT}...`));

// 5o4QRFVzCIuGbX6L    mern-stack

//mongodb+srv://mern-stack:<password>@cluster0.yza8k0o.mongodb.net/?retryWrites=true&w=majority
