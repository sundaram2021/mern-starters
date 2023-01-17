import mongoose from "mongoose";

const connect = async () => {
  await mongoose.connect(
    "mongodb+srv://mern-stack:5o4QRFVzCIuGbX6L@cluster0.yza8k0o.mongodb.net/?retryWrites=true&w=majority"
  );
  console.log("server is connected to mongodb database...");
};

export default connect  