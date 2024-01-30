import express from 'express';
const router = express.Router();

import { signupUser, signinUser, deleteUser} from '../controller/user.js';

router.post('/signup', signupUser)
router.post('/signin', signinUser)
// router.get('/logout')
router.delete('/delete/:id', deleteUser)

export default router;