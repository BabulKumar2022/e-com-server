import  express   from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import { createProductController,
    updateProductController,
      getProductController,
      getSingleProductController,
      productPhotoController,
      deleteProductController
     } from "../controllers/productController.js";
import formidable from "express-formidable";


const router = express.Router();


//=======routes=Create==Product===========
router.post('/create-product', requireSignIn, isAdmin, formidable(), createProductController)

//=======routes=Update==Product===========
router.put('/update-product/:pid', requireSignIn, isAdmin, formidable(), updateProductController)

//=======routes===GetAll=Product===========
router.get('/get-product',  getProductController)

//=======routes===GetSingle=Product===========
router.get('/get-product/:slug',  getSingleProductController)


//=======routes===Get=Product=photo==========
router.get('/product-photo/:pid',  productPhotoController)

//=======routes===Delete=Product===========
router.delete('/delete-product/:pid',  deleteProductController)



export default router;