const mongoose=require('mongoose');
const express=require('express');

const cors =require('cors');
require('dotenv').config();


const app=express();//app object
const port =process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
//middle ware


const uri= process.env.ATLAS_URI;
mongoose.connect(uri,{useNewUrlParser:true});

const connection=mongoose.connection;
connection.once('open',()=>{
    console.log("Mongoose database connection successful");
})

const usersRouter =require('./users')
app.use('/',usersRouter)

app.listen(port,()=>{
    console.log(`Server running on the port : ${port}`)
}); 





// app.set('view engine', 'pug');
// app.set('views','./views');

//simple web page
// app.get('/',function(req,res){
//     res.send("hello world");
// });
// app.get('/first_template', function(req, res){
//     res.render('first_view');
//  });


