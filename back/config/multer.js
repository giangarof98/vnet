import multer from 'multer';
import {storage, storagePost} from './cloudinary.js';

const profile = multer({storage:storage});
const multerProfile = profile.array("image");

const uploadPost = multer({storagePost:storagePost});
const multerPost = uploadPost.array("image");

export {multerProfile, multerPost}