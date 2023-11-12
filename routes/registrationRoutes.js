// router.post('./register', async(req, res, next)=>{
//     try{
//         //const{email,password}=req.body;
//         //if(!email || !password)throw createError.BadRequest();
//         const result = await authSchema.validateAsync(req.body);
//         const Exists = await User.findOne({email: email})

//         if(Exists)throw createError.conflict(`${email} is alrady beem registered`)
//         const user = new user(result)

//         const savedUser = await user.save()
//         res.send({savedUser});
//     }catch(error){
        
//             if(error.isJoi ===true)error.status = 442
//             next(error)
        
//     }
// })