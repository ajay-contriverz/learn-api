const express = require("express");
require("./config");
const User = require("./models");
const cors = require("cors");
const Product = require("./productModels");

const port = 8000;
const app = express();

app.use(express.json());
app.use(cors());

app.get("/", async (req, res) => {
  // let user = new User(req.body);
  let result = await User.find();
  res.send(result);
});

//add users
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

//add products
app.post("/add-product", async (req, res) => {
  let product = new Product(req.body);
  let result = await product.save();
  res.send(result);
});

app.get("/products", async (req, res) => {
  let product = await Product.find();
  if (product.length > 0) {
    res.send(product);
  } else {
    res.send({ result: "No Products" });
  }
});

//delete api
app.delete("/products/:id", async (req, res) => {
  let product = await Product.deleteOne({ _id: req.params.id });
  res.send(product);
});

//prefill product api
app.get("/products/:id", async (req, res) => {
  let product = await Product.findOne({ _id: req.params.id });
  if (product) {
    res.send(product);
  } else {
    res.send({ result: "No Product Found" });
  }
});

//update product api
app.put("/products/:id", async (req, res) => {
  let product = await Product.updateOne(
    { _id: req.params.id },
    {
      $set: req.body,
    }
  );
  res.send(product);
});

//using Patch
// app.patch("/products/:id", async (req, res) => {
//   let product = await Product.updateOne(
//     { _id: req.params.id },
//     {
//       $set: req.body,
//     }
//   );
//   res.send(product);
// });

app.listen(port, () => {
  console.log(`Server running at ${port}`);
});
