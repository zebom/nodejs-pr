const express = require('express')
const studentRoutes= require('./routes/studentRoutes');
const userRoutes = require('./routes/userRoutes');
const cors = require ('cors');


// require('dotenv').config();
require('dotenv').config();
require('./helpers/init_mongodb');


const app = express();
// app.use(cors({
//     origin:"http://localhost:3000",
    
// }))
app.use(cors({
  origin: 'http://localhost:3000',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
  allowedHeaders: 'Authorization,Content-Type',
}));


app.use(express.json());
app.use(userRoutes);
app.use(studentRoutes);

// handling 404 error
app.use((req, res, next)=>{
    const  err = new Error("Not Found");
    err.status = 404
    next(err)
})
// error handler
app.use((err,req,res,next)=>{
    res.status(err.status || 500)
    res.send({
        error:{
            status: err.status || 500,
            message: err.message
        }
    })
})

app.listen(process.env.PORT || 4000, function(){
    console.log('Now listening for request on: http://localhost:4000' );
});
