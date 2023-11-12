const { default: mongoose } = require('mongoose');
const User = require('../models/user')
const createError = require("http-errors");
// const { authSchema}=require('../auth/authSchema');




//add student


module.exports= {
    // AddUser: async(req,res, next)=>{
    //     try{ 
    //         const {email,password}=req.body
            
    //         const result = await authSchema.validateAsync(req.body);
    //         const existingUser=await User.findOne({email:email });
    //         if (existingUser){
    //             throw createError.Conflict(`Email ${email}already exists`)
    //         }

    //         const user= new User(result);

    //         const savedUser=await user.save()

    //         res.send(savedUser);
    // }catch (error){
    //     console.log(error)
    // }
    // }
    GetUser: async(req,res, next)=>{
       const id = req.params.id;
       try{ 
        const user =await User.findById(id)
        if(!user){
            throw(createError(404,"user does not exist"))
        }res.send(user);
        }catch(error){
        console.log(error.message);
        if (error instanceof mongoose.CastError){
        next(createError(400,"invalid user"))
    return
        }
        next(error)
    }
},
   
    UpdateUser:async(req,res, next)=>{
        try{
            const id = req.params.id;
            const update = req.body;
            const options = {new: true}
            const user = await User.findByIdAndUpdate(id,update,options)
    
            res.send(user);
        }catch(error) {
            console.log(error.message)
        }
      
    },
    DeleteUser:async(req,res, next)=>{
        try{
            const id = req.params.id;
            const users = await User.findByIdAndDelete(id)
            if(!users){
                throw createError(404, "student does not exist")
            } 
    
            res.send(users);
        }catch(error) {
            console.log(error.message)
            if(error instanceof mongoose.CastError){
                next(createError(400, "Invalid student id"));
                return;
            }
        }
      }
}