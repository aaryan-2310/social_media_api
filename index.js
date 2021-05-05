const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postsRoute = require("./routes/posts");
const port = process.env.PORT || 3000;

dotenv.config();

mongoose.connect(
  process.env.MONGOD_URL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("Connected to MongoDB");
  }
);

//MiddleWare
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", postsRoute);
app.get("/", (req, res) => {
  res.send("Welcome to Social Media API HomePage!");
});

// app.use("api/user", (req, res) => {
//   res.send("Welcome to Users!");
// });

app.listen(port, () => console.log(`Example app listening on port port!`));
