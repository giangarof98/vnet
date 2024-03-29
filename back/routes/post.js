import express from 'express';
const router = express.Router();
import {
    getAllPost,
    createPost,
    findPost,
    updatePost,
    deletePost,
    likePost
} from '../controller/post.js';

import { multerPost } from '../config/multer.js';
import { protect} from '../config/authMiddleware.js';

router.get('/', getAllPost)
router.get('/:id', findPost)

router.post('/add', protect, multerPost, createPost)
router.post('/like/:id', protect, likePost)

router.put('/:id', protect, multerPost, updatePost)

router.delete('/:id', protect, deletePost)

export default router;