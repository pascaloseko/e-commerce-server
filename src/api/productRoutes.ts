import express from 'express';
import {
  createProduct,
  createProductReview, deleteProduct,
  getProductById,
  getProducts,
  getTopProducts, updateProduct,
} from '../controllers/productControllers';
import { admin, protect } from '../middlewares';

const router = express.Router();

router.route('/').get(getProducts).post(protect, admin, createProduct);
router.route('/:id/reviews').post(protect, createProductReview);
router.route('/top').get(getTopProducts);
router.route('/:id').get(getProductById).delete(protect, admin, deleteProduct).put(protect, admin, updateProduct);

export default router;