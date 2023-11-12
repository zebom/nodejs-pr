const Student= require("../models/studentModel")
const mongoose = require('mongoose')
const createError = require ('http-errors')

// Add student
module.exports ={
    Addstudent: async (req, res) => {
        try {
            const student = new Student(req.body);
            const result = await student.save();
            res.send(result);
        } catch (error) {
            console.log(error.message);
        }
    },
    
    getStudent: async (req, res, next) => {  
    const id = req.params.id;    
    try {
    const student = await Student.findById(id)
    if(!student){
        throw(createError(404, "student does not exist"))
    }
    res.send(student)
   } catch (error){
    console.log(error.message);
    if(error instanceof mongoose.CastError){
        next(createError(400, "invalidstudent id"));
        return;
    }
    next(error)
   }
},
getAllStudent: async(req, res)=>{
    try{
        const student = await Student.find({})
        
        res.send(student)
    }
    catch(error){
    console.log(error.message);
    
}
},

pacthStudent:  async (req, res, next) => {
    try {
        const id = req.params.id;
        const update = req.body;
        const options = { new: true }; // Corrected variable name from 'options' to 'options'
        const result = await Student.findByIdAndUpdate(id, update, options); // Corrected the update and options parameters

        res.send(result);
    } catch (error) {
        console.log(error.message);
    }
},
deleteStudent:  async (req, res, next ) =>{
    const id = req.params.id
    try{
        const student = await Student.findByIdAndRemove(id)
        if(!student){
            throw(createError(404, "student does not exist"))
        }
        res.send(student);

    }catch (error){
        console.log(error.message)
        if(error instanceof mongoose.CastError){
            next(createError(400,"invalid student id"))
            return;
        }
        next(error)
    }
}
}