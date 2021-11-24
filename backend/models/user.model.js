const mongoose =require('mongoose');

const Schema=mongoose.Schema;

const userSchema=new Schema({
    registrationNo:{type:Number,unique:true,required:true},
    username:{type:String,reqiuired:true},
    role: {type:String,required:true},

},{
    timestamp:true,
});

const User=mongoose.model('User',userSchema);

module.exports=User;