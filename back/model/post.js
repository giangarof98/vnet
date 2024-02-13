import mongoose from "mongoose"
import User from './user.js'
import { Schema } from "mongoose";

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
    likes: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    image: [{url:String,filename:String}],
    
}, {timestamps:true})

const post = mongoose.model('Post', postSchema);
export default post;