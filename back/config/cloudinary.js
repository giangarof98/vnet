import {CloudinaryStorage} from "multer-storage-cloudinary";
import { v2 as cloudinary } from 'cloudinary'


cloudinary.config({
    cloud_name: process.env.CLOUD,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

const storage1 = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'Vnet',
        allowedFormats: ['png', 'jpeg', 'jpg']
    }
});

const storage2 = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'profileImg',
        allowedFormats: ['png', 'jpeg', 'jpg']
    }
});

export { storage1, storage2, cloudinary}