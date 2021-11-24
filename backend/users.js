const router=require('express').Router();
let User=require('./models/user.model');
// retrieve
router.route('/').get((req,res)=>{
    User.find()
        .then(users=>res.json(users))
        .catch(err=>res.status(400).json('Error: '+err));
});
// create
router.route('/add').post((req,res)=>{
    const registrationNo=Number(req.body.registrationNo);
    const username=req.body.username;
    const role=req.body.role;

    const newUser =new User({
        registrationNo,
        username,
        role,
    });

    newUser.save()
        .then(()=>res.json("User Added"))
        .catch(err=>res.status(400).json('Error: '+err));
    });
//retrieve id
router.route('/:id').get((req,res)=>{
    User.findById(req.params.id)
        .then(user=>res.json(user))
        .catch(err=>res.status(400).json('Error: '+err));
});

//delete
router.route('/:id').post((req,res)=>{
    User.findByIdAndDelete(req.params.id)
    .then(()=>res.json('User deleted'))
    .catch(err=>res.status(400).json('Error: '+err));
});
//update
router.route('/update/:id').post((req,res)=>{
    User.findById(req.params.id)
    .then(user=>{
        user.registrationNo=Number(req.body.registrationNo);
        user.username=req.body.username;
        user.role=req.body.role;

    user.save()
        .then(()=>res.json('user updated'))
        .catch(err=>res.status(400).json('Error: '+err));
    })
    .catch(err=>res.status(400).json('Error: '+err));
});


module.exports=router;