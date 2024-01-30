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
    updateUser

} from '../controller/user.js';


router.get('/users', getAllUsers)
router.post('/signup', signupUser)
router.post('/signin', signinUser)
router.get('/logout', logoutUser)
router.get('/:id', profileUser)
router.put('/update/:id', multerProfile, updateUser)
router.delete('/delete/:id', deleteUser)

export default router;