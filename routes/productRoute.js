import  express   from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import { createProductController, getProductController, getSingleProductController } from "../controllers/productController.js";
import formidable from "express-formidable";


const router = express.Router();


//=======routes=Create==Product===========
router.post('/create-product', requireSignIn, isAdmin, formidable(), createProductController)

//=======routes===GetAll=Product===========
router.get('/get-product',  getProductController)

//=======routes===GetSingle=Product===========
router.get('/get-product/:slug',  getSingleProductController)



export default router;