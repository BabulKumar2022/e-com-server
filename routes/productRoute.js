import  express   from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import { createProductController,
    updateProductController,
      getProductController,
      getSingleProductController,
      productPhotoController,
      deleteProductController,
      productFiltersController,
      productCountController,
      productListController,
      searchProductController,
      relatedProductController,
      productCategoryController
     
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

//============filter-product=====================
router.post('/product-filters', productFiltersController)

//===========product count==========================
router.get('/product-count', productCountController);

//============product per page=========================
router.get('/product-list/:page', productListController)

//============search==product======================
router.get('/search/:keyword', searchProductController)


//==========similar product============
router.get('/related-product/:pid/:cid', relatedProductController)

// ===get product category wise ============
router.get('/product-category/:slug', productCategoryController)

//====payment route=========================
//token
// router.get('/braintree/token', braintreeTokenController)
//payment
// router.post('/braintree/payment', requireSignIn, braintreePaymentController)


export default router; 