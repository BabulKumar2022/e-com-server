import express from 'express'
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import { createCategoryController,
     updateCategoryController,
      getCategoryController,
      singleCategoryController,
      deleteCategoryController,

     } from '../controllers/categoryController.js';

  

  const router = express.Router();

//routes for create category
router.post('/create-category', requireSignIn, isAdmin, createCategoryController)


//routes for update category
router.put('/update-category/:id', requireSignIn, isAdmin, updateCategoryController)


//routes for get all category
router.get('/get-category', getCategoryController)

//routes for get single category
router.get('/single-category/:slug', singleCategoryController)

//routes for delete single category
router.delete('/delete-category/:id', requireSignIn, isAdmin, deleteCategoryController)



export default router; 