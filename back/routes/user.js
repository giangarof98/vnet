import express from 'express';
const router = express.Router();
import { multerProfile } from '../config/multer.js';
import {
    signupUser, 
    signinUser, 
    deleteUser,
    logoutUser,
    getAllUsers,
    profileUser,
    updateUser,
    followUser

} from '../controller/user.js';

import { protect, admin } from '../config/authMiddleware.js';


router.get('/users', getAllUsers)
router.post('/follow/:id', protect, followUser)
router.post('/signup', signupUser)
router.post('/signin', signinUser)
router.get('/logout',  logoutUser)
router.get('/:id', profileUser)
router.put('/update/:id', protect, multerProfile, updateUser)
router.delete('/delete/:id', protect, admin, deleteUser)

export default router;