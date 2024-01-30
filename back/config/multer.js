import multer from 'multer';
import {storage1, storage2} from './cloudinary.js';

const uploadProfile = multer({storage2:storage2});
const uploadPost = multer({storage1:storage1});

const multerProfile = uploadProfile.array("image");

export {multerProfile}