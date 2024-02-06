import mongoose from "mongoose"
import User from './user.js'

const postSchema = new mongoose.Schema({
    author: {
        id: {
            type: Schema.Types.ObjectId,
            ref: "User"
        },
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    title:{
        type:String,
        // required: true
    },
    description: {
        type:String,
        // required:true
    },
    image: [{url:String,filename:String,originalname:String}],
    
}, {timestamps:true})

const post = mongoose.model('Post', postSchema);
export default post;