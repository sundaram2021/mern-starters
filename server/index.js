import bodyParser from "body-parser";
import cors from "cors";
import * as dotenv from "dotenv";
import express from "express";
import connect from "./database/mongodb.js";
import router from "./routes/Registration.js";

dotenv.config();

const PORT = process.env.PORT || 9090;
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.json())


app.use("/", router)

await connect();

app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});