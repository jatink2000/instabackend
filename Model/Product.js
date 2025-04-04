const { mongoose } = require("mongoose")

const productSchema = mongoose.Schema({
   title: String,
   image: String,
   price: String,
   rating:String,
   des:String,
   category:String,
   quantity:String
})
const product = new mongoose.model("products", productSchema);
module.exports = product;