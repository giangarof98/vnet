import User from "../model/user.js";

// Signup/Register user
// route: /api/user/signup
// Post
const signupUser = async(req,res) => {
    const {name, username, password, email} = req.body;
    
    try {
        const userEmailExist = await User.findOne({email})
        if(userEmailExist){
            res.status(400).send({message: 'Email registered already, try a new one.'})
        }
    
        const newUser = await User.create({
            name, username, email, password
        })
        
        console.log(newUser)
        res.status(200).json({userProfile: newUser, message: 'User created'})
        
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
        if(user){
            res.status(200).json({userProfile: user, message: 'Welcome back'})
        } else{
            res.status(400).json({message: 'No user were found with the provided credentials.' });
        }
    } catch (error) {
        res.status(500).json({error, message: 'Error happened in the server side; try again later.' });
    }
    
}

// Get all the users
// route: /api/user/admin/users
// Get

// Logout user
// route: /api/user/logout
// Get

// Profile user
// route: /api/user/:id
// Get

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

export {signupUser, signinUser, deleteUser}