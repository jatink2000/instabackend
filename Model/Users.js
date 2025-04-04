const { mongoose } = require("mongoose")

const childSchema = mongoose.Schema({
   firstname: String,
   lastname: String,
   email: String,
   password: String
})

const child = new mongoose.model("Users", childSchema);
module.exports = child;