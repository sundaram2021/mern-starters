const express = require("express")

const PORT = 9090
const app = express();

app.get("/", (req, res) => {
    res.send("Hello world")
})

app.listen(PORT, () => console.log(`server is running at ${PORT}...`))

// 5o4QRFVzCIuGbX6L    mern-stack

//mongodb+srv://mern-stack:<password>@cluster0.yza8k0o.mongodb.net/?retryWrites=true&w=majority