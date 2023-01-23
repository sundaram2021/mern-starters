import bodyParser from "body-parser";
import cors from "cors";
import * as dotenv from "dotenv";
import express from "express";
import passport from "passport";
import passportConfig from "./config/passport.js";
import connect from "./database/mongodb.js";
import routes from "./routes/index.js";

dotenv.config();

const PORT = process.env.PORT || 9090;
const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(passport.initialize());
passportConfig(passport);

app.get("/", (req, res) => {
  res.send("Hello World");
});
app.use("/", routes);

await connect();

app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
