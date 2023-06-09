import productModel from '../models/productModel.js'
import categoryModel from "../models/categoryModel.js"
import fs from 'fs';
import slugify from 'slugify';


  





//========create==product================

export const createProductController = async(req, res)=>{
    try {
        const {name, slug,  description, price, category, quantity}= req.fields;
        const {photo} = req.files;
         // validation
         switch(true){
            case !name:
                return res.status(500).send({error: 'Name is Required'})
            case !description:
                return res.status(500).send({error: 'Description is Required'})
            case !price:
                return res.status(500).send({error: 'Price is Required'})
            case !category:
                return res.status(500).send({error: 'Category is Required'})
            case !quantity:
                return res.status(500).send({error: 'Quantity is Required'})
            case !photo && photo.size > 1000000:
                return res.status(500).send({error: 'Photo is Required less than 1mb'})

         }
         
         const  products = new productModel({...req.fields, slug:slugify(name) })
         if(photo){
            products.photo.data = fs.readFileSync(photo.path)
            products.photo.contentType = photo.type
         }
         await products.save();
         res.status(201).send({
             success: true,
             message: 'Product Create Successfully',
             products,
         });
        } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            error,
            message: "Error in creating product"

        })
    }
}

//============update=product===========
export const updateProductController = async(req, res)=>{
    try {
        const {name, slug,  description, price, category, quantity}= req.fields;
        const {photo} = req.files;
         // validation
         switch(true){
            case !name:
                return res.status(500).send({error: 'Name is Required'})
            case !description:
                return res.status(500).send({error: 'Description is Required'})
            case !price:
                return res.status(500).send({error: 'Price is Required'})
            case !category:
                return res.status(500).send({error: 'Category is Required'})
            case !quantity:
                return res.status(500).send({error: 'Quantity is Required'})
            case !photo && photo.size > 1000000:
                return res.status(500).send({error: 'Photo is Required less than 1mb'})

         }
         
         const  products =await productModel.findByIdAndUpdate(req.params.pid,
            {...req.fields, slug: slugify(name)}, {new: true}
            )
         if(photo){
            products.photo.data = fs.readFileSync(photo.path)
            products.photo.contentType = photo.type
         }
         await products.save();
         res.status(201).send({
             success: true,
             message: 'Product update Successfully',
             products,
         });
        } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            error,
            message: "Error in updating product"

        })
    }
}

//==========get all product============
export const getProductController = async (req, res) =>{
try {
    const products = await productModel.find({}).select("-photo").limit(12).sort({createdAt: -1})
    res.status(200).send({
        success: true,
        total: products.length,
        message: "AllProduct",
        products,
        
    })
} catch (error) {
    console.log(error)
    res.status(500).send({
        success: false,
        message: 'Error in getting product',
        error: error.message,
    })
    
}
}

    
// get single product

export const getSingleProductController = async (req, res) =>{
    try {
        const product =await productModel.findOne({slug: req.params.slug}).select("-photo");
        res.status(200).send({
            success: true,
            message: "Single Product ",
            product,
             
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in getting single product',
            error: error.message,
        })
    }
}

//get-product-photo

export const productPhotoController =async (req, res) =>{
    try {
        const product = await productModel.findById(req.params.pid).select('photo')
        if(product.photo.data){
            res.set("Content-type", product.photo.contentType);
            return res.status(200).send(product.photo.data)
        }
    } catch (error) {
        res.status(500).send({
            success: false,
            message: 'Error in getting  product photo',
            error,
        })
    }
}
//========delete=product============
export const deleteProductController = async(req, res)=>{
    try {
        await productModel.findByIdAndDelete(req.params.pid).select('-photo')
        res.status(200).send({
            success: true,
            message: 'Product deleting successfully',

        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: 'Error in deleting  product',
            error,
        })
    }
}

//===========filter-product=================
export const productFiltersController = async(req, res) =>{
    try {
        const {checked, radio} = req.body
        let args = {}
        if(checked.length > 0) args.category = checked
        if(radio.length ) args.price ={$gte: radio[0], $lte: radio[1]}
        const products = await productModel.find(args);
        res.status(200).send({
            success: true,
            products,
        })
    } catch (error) {
        console.log(error)
        res.status(400).send({
            success: false,
            message: "Error while filtering products",
            error
        })
        
    }
}
// ========product count ==============

export const productCountController = async(req, res) =>{
    try {
        const total = await productModel.find({}).estimatedDocumentCount();
        res.status(200).send({
            success: true,
            total,
        })
    } catch (error) {
        console.log(error)
        res.status(400).send({
            message: "Error in product count",
            error,
            success:false,
        })
        
    }
}
// ======product list base on page==============
export const productListController = async(req, res) =>{
    try {
        const perPage = 3
         const page =req.params.page ? req.params.page : 1
         const products = await productModel.find({})
         .select("-photo")
         .skip((page-1)
         * perPage)
         .limit(perPage).sort({createdAt: -1})
         res.status(200).send({
            success: true,
            products,
         })
    } catch (error) {
        console.log(error)
        res.status(400).send({
            success:false,
            message: "error in per ctrl"
        })
        
    }
}
//============search==product=controller function=====================
export const searchProductController = async(req, res)=>{
    try {
        const {keyword} = req.params
        const result = await productModel.find({
            $or: [
                {name: {$regex: keyword, $options: "i"}},
                {description: {$regex: keyword, $options: "i"}}
            ]
        }).select("-photo")
        res.json(result)
    } catch (error) {
        console.log(error)
        res.status(400).send({
            success: false,
            message: "Error in search product API"
        })
        
    }
}
//============ similar product get function=============
  
export const relatedProductController = async (req, res) =>{
    try {
        const {pid, cid} = req.params;
        const products = await productModel.find({
            category:cid,
            _id: {$ne:pid}
        }).select("-photo").limit(3).populate("category");
        res.status(200).send({
            success: true,
            products,
        })
    } catch (error) {
        console.log(error)
        res.status(400).send({
            success: false,
            message: "error while getting related product",
            error,
        })
        
    }
}
//========get category wise product==============
export const productCategoryController = async(req, res)=>{
    try {
        const category = await categoryModel.findOne({slug: req.params.slug})
        const products =await productModel.find({category})
        res.status(200).send({
            success: true,
            category,
            products
        })
    } catch (error) {
        console.log(error)
        res.status(400).send({
            success: false,
            error,
            message: "ERROR while getting product"
        })
        
    }
}

// payment gateway api=============
//token
export const braintreeTokenController =async () =>{
   try {
    gateway.clientToken.generate({}, function(err, response){
        if(err){
            res.status(500).send(err)
        }else{
            res.send(response)
        }
    }
   
    )
   } catch (error) {
    console.log(error)
    
   }

}
 //payment
export const braintreePaymentController = async()=>{
try {
    const {cart, nonce} = req.body
    let total = 0
    cart.map(i => {total += i.price
    })
    let newTransaction = gateway.transaction.sale({
        amount: total,
        paymentMethodNonce: nonce,
        Options:{
            submitForSettlement: true
        }
    }
   
    )
} catch (error) {
    console.log(error)
    
}
}