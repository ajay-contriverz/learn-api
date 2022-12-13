const express = require("express");
require("./config");
const User = require("./models");
const cors = require("cors");

const port = 8000;
const app = express();

app.use(express.json());
app.use(cors());

app.get("/", async (req, res) => {
  // let user = new User(req.body);
  let result = await User.find();
  res.send(result);
});

app.post("/signup", async (req, res) => {
  let user = new User(req.body);
  let result = await user.save();
  res.send(result);
});

app.post("/login", async (req, res) => {
  if (req.body.email && req.body.password) {
    let user = await User.findOne(req.body).select("-password");
    if (user) {
      res.send(user);
    } else {
      res.send({ result: "Username or Password is Incorrect" });
    }
  } else {
    res.send({ result: "Username or Password is required" });
  }
});

app.listen(port, () => {
  console.log(`Server running at ${port}`);
});
