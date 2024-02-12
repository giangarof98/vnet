import Post from "../model/post.js";
import User from "../model/user.js";

// Get All Posts
const getAllPost = async(req,res) => {
    const post = await Post.find({})
    res.status(200).json(post)
}

// Create Post
const createPost = async(req,res) => {
    try {
        const post = new Post(req.body)
        post.image = req.files.map(f => ({url: f.path, filename: f.filename}))
        post.author = req.user._id
        await post.save();
        res.status(200).json(req.body);
        // console.log(post)
    } catch (error) {
        res.status(400).json({error, error: 'Please fill out all fields'})
    }
}

// Update Post
const updatePost = async(req,res) => {
    const {id} = req.params;
    const {title, description, image, repo, link, tech} = req.body;
    const post = await Post.findById(id)
    try {
        const imgs = req.files.map(f => ({
            url: f.path, 
            filename: f.filename 
            }));
            
            if(req.body.deleteImages){
                for(let filename of req.body.deleteImages){
                    await cloudinary.uploader.destroy(filename)
                }
                await post.updateOne({$pull: {image: {filename: { $in: req.body.deleteImages}}}})
                
            }
            
            // IF there is a previous image, 
            // This block of code will check if there is some
            // IF there is a previous IMG, but not a new one is provided, the previous one will prevail

            if (imgs.length > 0) {
                post.image = imgs;
            }

            if(post){
                post.title = title;
                post.description = description;
                const savedPost = await post.save()
                res.status(200).json({savedPost, message: 'Post updated successfuly'})
            }
        
    } catch (error) {
        res.status(404).json(error, {message:'error detected, please try again later'})
    }
}

// Find post
const findPost = async(req,res) => {
    try{
        const {id} = req.params;
        const post = await Post.findById(id).populate('author')
        res.send(post)
    } catch(e){
        res.send(e.message)
    }
}

// Delete Post
const deletePost = async(req,res) => {
    try{
        const post = await Post.findById(req.params.id)
        if(post){
            await Post.deleteOne({_id: post._id})
            res.status(200).json(post)
        }
    }catch(e){
        res.status(404).json(e.message)
    }
}

export {
    getAllPost,
    createPost,
    findPost,
    updatePost,
    deletePost
}