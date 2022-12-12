const express = require("express");
require("./config");
const User = require("./models");
const cors = require("cors");

const port = 8000;
const app = express();

app.use(express.json());
app.use(cors());

app.post("/signup", async (req, res) => {
  let user = new User(req.body);
  let result = await user.save();
  res.send(result);
});

app.listen(port, () => {
  console.log(`Server running at ${port}`);
});
