import express from 'express';
import {
  authUsers,
  deleteUser, getUserById,
  getUserProfile,
  getUsers,
  registerUser, updateUser,
  updateUserProfile,
} from '../controllers/userControllers';
import { admin, protect } from '../middlewares';

const router = express.Router();

router.route('/').post( registerUser).get(protect, admin, getUsers);
router.post('/login', authUsers);
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile);
router.route('/:id').delete(protect, admin, deleteUser).get(protect, admin, getUserById).put(protect, admin,  updateUser);


export default router;