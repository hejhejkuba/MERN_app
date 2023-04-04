const mongoose = require(`mongoose`)

let productPhotosSchema = new mongoose.Schema(
    {
       filename:{type:String}
    })


let productsSchema = new mongoose.Schema(
    {
        name: {type: String, required:true},
        details: {type: String, required:true},
        year: {type: Number, required:true},
        price: {type: Number, required:true},
		amount: {type: Number, required:true},
        photos:[productPhotosSchema],
        sold: {type: Boolean, default:false}
    },
    {
       collection: `products`
    })

module.exports = mongoose.model(`products`, productsSchema)