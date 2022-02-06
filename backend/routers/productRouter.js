import express from "express";
import expressAsyncHandler from "express-async-handler";
import data from "../data.js";
import Product from "../models/productModel.js";

const productRouter = express.Router();

//API to provide product data for HomeScreen on demand
productRouter.get('/', expressAsyncHandler(async (req, res) => {
    const products = await Product.find({});
    res.send(products);
 })
);

//API to provide product data for ProductScreen on demand
productRouter.get('/:id', expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product){
        res.send(product);
    }else{
        res.status(404).send({message: 'Product Not Found'});
    }
    
 })
);



//insert into the MongoDb database
productRouter.get('/seed', expressAsyncHandler(async (req, res) => {
    // await Product.remove({});
    const createdProducts = await Product.insertMany(data.products);
    res.send({ createdProducts });
}))

export default productRouter;