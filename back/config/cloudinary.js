import {CloudinaryStorage} from "multer-storage-cloudinary";
import { v2 as cloudinary } from 'cloudinary'


cloudinary.config({
    cloud_name: 'gggarof',
    api_key: '757512262653573',
    api_secret: 'nXv3l6yhPd_pozurhbBbVAJWZ9I'
});
const storagePost = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'Vnet',
        allowedFormats: ['png', 'jpeg', 'jpg']
    }
});

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'profileImg',
        allowedFormats: ['png', 'jpeg', 'jpg']
    }
});

export {storage, storagePost, cloudinary}