const express = require("express")
const app = express()
const bodyParser = require("body-parser")
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({}))
const cors = require("cors")
app.use(cors())
const { mongoose } = require("mongoose")
const child = require("./Model/Users")
const product = require("./Model/Product")
const cart = require("./Model/Cart")


app.listen(8080, () => {
    console.log("start at 8080")
})

//mongoose

mongoose.connect('mongodb+srv://jk0060701:YNGaddqw8kbBqixG@cluster0.jrxe8v9.mongodb.net/insta')
    .then(() => {
        console.log("mongoose connect")
    })
    .catch((err) => {
        console.log(err)
    })

//signup page backend 
app.post("/signup", async (req, res) => {
    const hp = new child({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: req.body.password
    })
    const result = await hp.save()
    if (result) {
        res.json({
            status: true,
            "msg": "signup successful"
        })
    }
    else {
        res.json({
            status: false,
            "msg": "failed to signup"
        })
    }
})

// alreadyuser ----------------

app.get("/alreadyuser",async(req,res)=>{
    const hp = await child.find({})
    if(hp){
        res.json({
            signup:hp,
            status:true
        })
    }
    else{
        res.json({
            status:false
        })
    }
})

//login page backend

app.post("/", async (req, res) => {
    const hp = await child.findOne({
        email: req.body.email,
        password: req.body.password
    })
    if (hp) {
        res.json({
            msg: "login success",
            status: true,
            userdetails:hp
        })
    }
    else {
        res.json({
            msg: "failed to login",
            status: false
        })
    }
})
// add product -------------------
app.post("/addproduct", async (req, res) => {
    const hp = new product({
        title: req.body.title,
        price: req.body.price,
        image: req.body.image,
        rating: req.body.rating,
        des: req.body.des,
        category: req.body.category,
        productid: req.body.productid
    })
    const result = await hp.save()
    if (result) {
        res.json({
            status: true,
            "msg": "product add successful"
        })
    }
    else {
        res.json({
            status: false,
            "msg": "failed to add product"
        })
    }
})


// products-------------------
app.get("/products", async (req, res) => {
    let hp = await product.find();
    if (hp) {
        res.json({
            status: true,
            product: hp,
            msg: "product featch success"
        })
    }
    else {
        res.json({
            status: false,
            msg: "product featch failed"
        })
    }
})

// add to cart 
app.post("/cart", async (req, res) => {
    // console.log(req.body.product)

    const hp = new cart({
        title: req.body.product.title,
        image: req.body.product.image,
        price: req.body.product.price,
        rating: req.body.product.rating,
        des: req.body.product.des,
        quantity: req.body.product.quantity,
        category: req.body.product.category,
        id:req.body.product.id
    })
    const result = await hp.save()
    if (result) {
        res.json({
            status: true,
            "msg": "add to cart"
        })
    }
    else {
        res.json({
            status: false,
            "msg": "failed to add cart"
        })
    }
})


// cartitem ----------------

app.get("/cartitem", async (req, res) => {
    let cartitem = await cart.find({})
    if (cartitem) {
        res.json({
            msg: "cart item",
            status: true,
            cartdata: cartitem
        })
    }
    else {
        res.json({
            msg: "failed cart item",
            status: false,
        })
    }
})



// remove item----------------

app.post("/removeitem",async(req,res)=>{
    let removeitem=await cart.deleteOne({"id":req.body.item})
})

// updatecart-----------------------

app.post("/updatecart",async(req,res)=>{
    const updateResult = await cart.updateOne(
        { id: req.body.itemid },
        { $set:{quantity: req.body.quantity,updateprice:req.body.totalprice} }
      );
})



// removeproduct -----------------
app.post("/removeproduct",async(req,res)=>{
    let removeitem=await product.deleteOne({"id":req.body.itemid})
    if(removeitem){
        res.json({
            status:true,
            "msg":"remove product"
        })
    }
    else{
        res.json({
            status:false,
            "msg":"failed to remove product"
        })
    }
})





app.get("/",(req,res)=>{
    res.json({
        status:true
    })
})
