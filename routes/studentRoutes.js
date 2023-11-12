const express = require('express');
const routes = express.Router();
const Student =require("../models/studentModel")
const studentController = require('../controllers/studentController');
const { verifyAccessToken } = require('../helpers/jwtHelper');


// Get a list of students from the database
routes.get('/students/:id',studentController.getStudent);

routes.get('/students',verifyAccessToken,studentController.getAllStudent);

// Add a student to the DB
routes.post('/students',studentController.Addstudent);

// Update a student in the DB
routes.patch('/students/:id',studentController.pacthStudent);



routes.delete('/students/:id',studentController.deleteStudent);

// registration routes
// routes.post('/register', async (req, res) => {
//     try {
//         // Extract registration data from the request body
//         const {firstname,  lastname, email, username,password } =req.body;
//        // Create a new registration instance using the Registration model
//         const registration = new Registration({
//             firstname,lastname,email,username,password
//         });
//         // Save the registration data to the database
//         const result = await registration.save();
//         // Respond with a success message or the created registration data
//         res.json({ message: 'Registration successful', data: result });
//     }catch (error){
//        // Handle any registration errors, e.g., validation errors, database errors
//        console.log(error.message)
//     }
// });

module.exports = routes;
