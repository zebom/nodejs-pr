// Import necessary dependencies
const express = require('express');
const router = express.Router();
const User = require('../models/user');
const createError = require('http-errors');
const userController=require('../controllers/userController')
const authSchema = require('../auth/authSchema');
// const {signAccessToken} = require("../helpers/jwtHelper")
// Define and import your authSchema for validation



// router.post('/user',async(req,res, next)=>{
//       try{
//         const result = await authSchema.validateAsync(req.body); 
//           const {email}=req.body
//           const exist =await User.findOne({email:email });
//             if (exist){
//                 throw createError.Conflict(`Email ${email} already exists`)
//             }
//             const user= new User(result);
//           const savedUser=await user.save()
//           const accesstoken = await signAccessToken(savedUser.id)
//            res.send({accesstoken});
//      }catch (error){
//        if(error.isJoi === true) {
//         error.status = 422;
//        }
//        next(error);
//    }
//      })
// Register a new user
router.post('/user',userController.PostRregister);
router.post('/user/login', userController.PostLogin);
router.post('/user/refresh', userController.PostRefreshToken);
router.get('/user/:id', userController.GetUser);
router.patch('/user/:id', userController.UpdateUser);
router.delete('/user/:id', userController.DeleteUser);
// router.post('/register', userController.AddUser);
module.exports = router;