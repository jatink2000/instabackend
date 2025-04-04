const { mongoose } = require("mongoose")

const cartSchema = mongoose.Schema({
   title: String,
   image: String,
   price: String,
   rating: String,
   des: String,
   category: String,
   quantity: String,
   id: String,
   updateprice:String
})
const cart = new mongoose.model("cart", cartSchema);
module.exports = cart;
