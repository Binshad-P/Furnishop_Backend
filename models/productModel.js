import mongoose from 'mongoose'
const productSchema=new mongoose.Schema({

    productname:{
        type:String,
        required:true
    },
    actualprice:{
        type:String,
        required:true
    },
    discountprice:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    images:{
        type:Array,
        required:true
    },
   
   description:{
        type:String,
        required:true
    },
    color:{
        type:String,
        required:true
    },
    brand:{
        type:String,
        required:true
    },
    material:{
        type:String,
        required:true
    },
    furnishfinish:{
        type:String,
        required:true
    },
    model:{
        type:String,
        required:true
    },
    about:{
        type:String,
        required:true
    }
   
   

})
const product=mongoose.model("product",productSchema)
export default product