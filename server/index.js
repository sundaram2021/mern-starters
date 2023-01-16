const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors')

const PORT = 9090;
const app = express();

app.use(cors())

const startMongodb = async() => {await mongoose
  .connect(
    "mongodb+srv://mern-stack:5o4QRFVzCIuGbX6L@cluster0.yza8k0o.mongodb.net/?retryWrites=true&w=majority"
)}
console.log('server is connected to mongodb database...');

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.listen(PORT, () => console.log(`server is running at ${PORT}...`));

// 5o4QRFVzCIuGbX6L    mern-stack

//mongodb+srv://mern-stack:<password>@cluster0.yza8k0o.mongodb.net/?retryWrites=true&w=majority
