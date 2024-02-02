import mongoose from "mongoose"
import bcrypt from 'bcrypt'

const userSchema = new mongoose.Schema({
    isAdmin:{
        type:Boolean,
        require:true,
        default:false
    },
    name: {
        type:String,
        required:true
    },
    username: {
        type:String,
        unique: true,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique: true
    },
    password:{
        type:String,
        required:true
    },
    bio:{
        type:String,
    },
    image:[{url:String,filename:String,originalname:String}]
}, {timestamps:true});

// Validate the password
userSchema.methods.matchPassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password)
}

// Hash the password
userSchema.pre('save', async function (next) {
    if(!this.isModified('password')){
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
})
const User = mongoose.model('User', userSchema);
export default User;