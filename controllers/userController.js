const { default: mongoose } = require('mongoose');
const User = require('../models/user')
const createError = require("http-errors");
const authSchema = require('../auth/authSchema');
const { signAccessToken, signRefreshToken, verifyRefreshTOKEN } = require('../helpers/jwtHelper');
// const { authSchema}=require('../auth/authSchema');




//add student
 

module.exports= {
    PostRregister: async(req,res, next)=>{
        try{
            const result = await authSchema.validateAsync(req.body); 
            const exist =await User.findOne({email:result.email});
            if (exist){
                throw createError.Conflict(`Email ${result.email} already exists`)
            }
            const user= new User(result);
            const savedUser=await user.save()
            const accesstoken = await signAccessToken(savedUser.id)
            res.send({accesstoken});
        }catch (error){
            if(error.isJoi === true) {
                error.status = 422;
            }
            next(error);
    }
     },
    PostLogin: async (req, res, next)=>{
        try{
            const result = await authSchema.validateAsync(req.body);
            const user = await User.findOne({email: result.email});
            if(!user) throw createError.NotFound('user not registered');

            const isMatch = await user.isValidPassword(result.password);
            if(!isMatch) throw createError.Unauthorized('username/password is not valid')

            const accessToken = await signAccessToken(user.id);
            const refreshToken = await signRefreshToken(user.id);
            // res.send(result);
            res.send({accessToken, refreshToken });
        }catch(error){
            if(error.isJoi === true) return next(createError.BadRequest('invalid username/password'))
            next(error)
        }
    },
     PostRefreshToken: async(req,res, next)=>{
         try{
             const {refreshToken}= req.body;
             if(!refreshToken)throw createError.BadRequest();
             const userId = await verifyRefreshTOKEN(refreshToken);
    
             const accessToken = await signAccessToken(userId);
             const refToken = await signRefreshToken(userId);
             res.send({accessToken:accessToken, refreshToken:refToken});
         }catch(error){
             next(error);
         }
    },
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