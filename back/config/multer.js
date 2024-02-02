import multer from 'multer';
import {storage} from './cloudinary.js';

const profile = multer({storage:storage});
// const uploadPost = multer({storage1:storage1});

const multerProfile = profile.array("image");

export {multerProfile}