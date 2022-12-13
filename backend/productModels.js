const mongoose = require("mongoose");
const ProductSchema = mongoose.Schema({
  name: String,
  price: Number,
  brand: String,
  userId: String,
  category: String,
});

module.exports = mongoose.model("products", ProductSchema);
