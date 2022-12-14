const jwt = require("jsonwebtoken");
const jwtKey = "ancbhddgfmgsf";

//middleware for token verification on api
module.exports = (req, res, next) => {
  let token = req.headers["authorization"];
  // console.log(token);
  if (token) {
    token = token.split(" ")[1];
    jwt.verify(token, jwtKey, (err, valid) => {
      if (err) {
        res.status(401).send({ result: "Unable to authorize: Token Invalid" });
      } else {
        next();
      }
    });
  } else {
    res.status(403).send({ result: "Unable to authorize: Token Missing" });
  }
};
