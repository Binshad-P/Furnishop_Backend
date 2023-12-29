import express, { Router } from "express";
import {upload} from '../multer.js'
import { addstock,removeproduct,singleproduct, stockdetails, updateProduct } from "../controllers/productController.js";

const router=express.Router()

router.post('/addstock', upload.fields([{name:"image1",maxCount:3},{name:"image2",maxCount:3},{name:"image3",maxCount:3},{name:"image4",maxCount:3}]),addstock)
router.get('/stockdata',stockdetails)
router.post('/updatestock/:productId',upload.fields([{name:"image1",maxCount:3},{name:"image2",maxCount:3},{name:"image3",maxCount:3},{name:"image4",maxCount:3}]),updateProduct)
router.delete('/removestock/:id',removeproduct)
router.get('/singleproduct/:productId',singleproduct)

export default router