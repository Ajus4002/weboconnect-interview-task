import express from 'express';
import {
  register,
  login,
  viewUserProfile,
  updateProfile,
  changePassword,
  deleteAccount,
  uploadProfilePic,
  listUsers,
  searchUsers

} from './controller.js';
import authMiddleware from '../../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/', listUsers);
router.get('/search',searchUsers);

router.use(authMiddleware);
router.get('/profile', viewUserProfile);
router.put('/profile',  updateProfile);
router.put('/change-password', changePassword);
router.delete('/delete-account', deleteAccount);
router.post('/upload-profile-pic', uploadProfilePic);

export default router;
