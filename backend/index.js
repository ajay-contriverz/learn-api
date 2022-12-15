const express = require("express");
require("./config");
const User = require("./models");
const cors = require("cors");
const Product = require("./productModels");
const jwt = require("jsonwebtoken");
const verifyToken = require("./middleware");
const bcrypt = require("bcrypt");

const port = 8000;
const app = express();

app.use(express.json());
app.use(cors());
// app.use(verifyToken);

const jwtKey = "ancbhddgfmgsf";

app.get("/", async (req, res) => {
  // let user = new User(req.body);
  let result = await User.find();
  res.send(result);
});

//add users
app.post("/signup", async (req, res) => {
  //converting password to encrypted form using bcrypt
  const hashPassword = await bcrypt.hash(req.body.password, 10);

  let user = new User({ ...req.body, password: hashPassword });
  let result = await user.save();
  // res.send(result);
  result = result.toObject();
  delete result.password;
  jwt.sign({ result }, jwtKey, { expiresIn: "24h" }, (err, token) => {
    if (err) res.send({ result: "Something Went Wrong" });
    res.send({ result, auth: token });
    //res.cookie("jwt", token)
  });
});

app.post("/login", async (req, res) => {
  if (req.body.email && req.body.password) {
    let user = await User.findOne({ email: req.body.email });
    // console.log(user);
    // console.log(req.body.email);
    // console.log(req.body.password);

    if (user) {
      const validPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );
      // console.log(user.password);
      if (!validPassword)
        return res.status(401).send({ result: "Invalid Email or Password" });
      jwt.sign({ user }, jwtKey, { expiresIn: "24h" }, (err, token) => {
        if (err) res.send({ result: "Something Went Wrong" });
        //res.cookie("jwt", token)
        res.send({ user, auth: token });
      });
      // res.send(user);
    } else {
      res.send({ result: "Username or Password is Incorrect" });
    }
  } else {
    res.send({ result: "Username or Password is required" });
  }
});

//add products
app.post("/add-product", verifyToken, async (req, res) => {
  let product = new Product(req.body);
  let result = await product.save();
  res.send(result);
});

app.get("/products", verifyToken, async (req, res) => {
  let product = await Product.find();
  if (product.length > 0) {
    res.send(product);
  } else {
    res.send({ result: "No Products" });
  }
});

//delete api
app.delete("/products/:id", verifyToken, async (req, res) => {
  let product = await Product.deleteOne({ _id: req.params.id });
  res.send(product);
});

//prefill product api
app.get("/products/:id", verifyToken, async (req, res) => {
  let product = await Product.findOne({ _id: req.params.id });
  if (product) {
    res.send(product);
  } else {
    res.send({ result: "No Product Found" });
  }
});

//update product api
app.put("/products/:id", verifyToken, async (req, res) => {
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

app.get("/search/:key", verifyToken, async (req, resp) => {
  let result = await Product.find({
    $or: [
      {
        name: { $regex: req.params.key },
      },
      {
        brand: { $regex: req.params.key },
      },
      {
        category: { $regex: req.params.key },
      },
    ],
  });
  resp.send(result);
});

//middleware for token verification on api
// function verifyToken(req, res, next) {
//   let token = req.headers["authorization"];
//   // console.log(token);
//   if (token) {
//     token = token.split(" ")[1];
//     jwt.verify(token, jwtKey, (err, valid) => {
//       if (err) {
//         res.status(401).send({ result: "Unable to authorize: Token Invalid" });
//       } else {
//         next();
//       }
//     });
//   } else {
//     res.status(403).send({ result: "Unable to authorize: Token Missing" });
//   }
// }

app.listen(port, () => {
  console.log(`Server running at ${port}`);
});
