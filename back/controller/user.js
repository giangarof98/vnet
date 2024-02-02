import User from "../model/user.js";
import { generateToken } from "../config/sessionConfig.js";

// Signup/Register user
// route: /api/user/signup
// Post
const signupUser = async(req,res) => {
    const {name, username, password, email, confirmPassword} = req.body;
    
    try {
        const emailExist = await User.findOne({email})
        const usernameExist = await User.findOne({username})
        if(password !== confirmPassword){
            return res.status(400).json({message: 'Password doesnt match. Try again.'})
        }else if(emailExist || usernameExist){
            return res.status(400).send({message: 'Email or username registered already, try a new one.'})
        }
    
        const newUser = await User.create({
            name, username, email, password
        })
        
        console.log(newUser)
        return res.status(200).json({userProfile: newUser, message: 'User created'})
        
    } catch (error) {
        res.send(error.message)
    }


}

// Login/Signin user
// route: /api/user/signin
// Post
const signinUser = async(req,res) => {
    const {username, password} = req.body;
    try {
        const user = await User.findOne({username});
        if(user && (await user.matchPassword(password))){
            const token = generateToken(res, user._id)
            res.status(200).json({userProfile: user, message: 'Welcome back'})
        } else{
            res.status(400).send({message: 'No user were found with the provided credentials.' });
        }
    } catch (error) {
        res.status(500).json({error, message: 'Error happened in the server side; try again later.' });
    }
    
}

// Get all the users
// route: /api/user/admin/users
// Get
const getAllUsers = async(req,res) => {
    const users = await User.find({})
    console.log(users)
    res.status(200).json(users)
}

// Logout user
// route: /api/user/logout
// Get
const logoutUser = async(req,res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0)
    })
    res.status(200).json({message: 'Logged out successfully'})
}

// Profile user
// route: /api/user/:id
// Get
const profileUser = async(req,res) => {
    const {id} = req.params
    const user = await User.findById(id)
    res.status(200).json(user)
}

// Delete user
// route: /api/user/delete/:id
// Delete
const deleteUser = async(req,res) => {
    const {id} = req.params;
    const user = await User.findByIdAndDelete(id);
    if(!user){
        res.status(400).json({message:'user already deleted, or user doesnt exist.'})
    } else {
        res.status(200).json({message:'User deleted successfully'});
        console.log(user)
    }
}

// Update user
// route: /api/user/signup
// Update
const updateUser = async(req,res) => {
    const {id} = req.params;
    const { 
        name, 
        username, 
        password, 
        confirmPassword, 
        email, 
        image, 
        bio
    } = req.body;
    const user = await User.findById(id)
    const emailRegistered = await User.findOne({email})
    const usernameRegistered = await User.findOne({username})
    try {
        const img = req.files.map(f => ({
            url: f.path,
            filename: f.filename,
            originalname: f.originalname}));
            
            if(req.body.deleteImages){
                for(let filename of req.body.deleteImages){
                    await cloudinary.uploader.destroy(filename)
                }
                await post.updateOne({$pull: {image: {filename: { $in: req.body.deleteImages}}}})
                
            }
            
            // IF there is a previous image, 
            // This block of code will check if there is some
            // IF there is a previous IMG, but not a new one is provided, the previous one will prevail
    
            if (img.length > 0) {
                user.image = img;
            }
            console.log(img)
        
            if(user){
        
                // user.image = image;
                user.name = name;
                user.username = username;
                user.password = password;
                user.email = email;
                user.bio = bio;
                // if(user.password !== confirmPassword){
                //     return res.status(400).json({message: 'Password doesnt match. Try again.'})
                // } else if(emailRegistered || usernameRegistered){
                //     return res.status(400).json({message: 'Email or username already registered. Try with another one.'})
                // } 
                // if(emailRegistered || usernameRegistered){
                //     return res.status(400).json({message: 'Email or username already registered. Try with another one.'})
                // }
                const updatedUser = await user.save()
                console.log(updatedUser)
                return res.status(200).json({updatedUser, message: 'User updated successfuly'})
        
            } else {
                return res.status(404).json({message: 'Invalid new information, try again.'})
            }
        } catch (error) {
            console.log(error)

    }


}

export {
    signupUser, 
    signinUser, 
    deleteUser, 
    logoutUser,
    getAllUsers,
    profileUser,
    updateUser
}