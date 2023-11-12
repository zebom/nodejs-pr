const  mongoose  = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt');

const userSchema = new Schema({
    email:{
        type:String,
        required:true,
        unique:true

    },
    password:{
        type:String,
        required:true,
        
    }
})

// hashing the pwd b4 saving in the database
// this function will be called b4 saving the user
userSchema.pre('save', async function(next){
    try{
        const salt = await bcrypt.genSalt(10)
        const hashedPwd = await bcrypt.hash(this.password, salt)
        this.password = hashedPwd
        next()
    }catch (error){
        next(error)
    }
})


const User= mongoose.model("User",userSchema)
module.exports= User
