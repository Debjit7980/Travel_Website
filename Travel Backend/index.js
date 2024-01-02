const mongoose=require('mongoose');
const express=require('express');
const cors=require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const cookieParser=require('cookie-parser');
const bodyParser=require('body-parser');
const trekDetails=require('./model');
const userDetails=require('./userDB');
const authenticate=require("./authenticate");
const app=express();
app.use(bodyParser.urlencoded({extended : false}));
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: 'https://travel-website-naturesdeck.vercel.app', // Replace with your frontend's actual origin
  methods: ['POST', 'GET'],
  credentials: true,
}));


const port=process.env.PORT|| 8000;
mongoose.connect("mongodb+srv://debjitsingharoy007:O2b13SGjjeIUJ4Jg@cluster0.gdcevv7.mongodb.net/TravelDb?retryWrites=true&w=majority")

//trekDetails.createIndexes();

app.post("/signup",async (req,res)=>{
    try{
        const name=req.body.name
        const email=req.body.email
        const password=req.body.pass

        const formData={
            name,email,password
        }
        const preuser=await userDetails.findOne({email:email});
        if(preuser)
        {
        res.send({message:"User is already registered"});
        console.log("User is already registered ");
        }
        else
        {
        
        const user=new userDetails(formData);   //Passed the form data to the collection module to store in the database.
        let result=await user.save();           //saving the data to the database.
        //alert("Data is stored Successfully");
        result=result.toObject();
        res.send({message:"Registered Successfully now Sign In"});
        console.log(result);
        }
    }
    catch(e)
    {
        console.error('Error creating user:', e);
        res.status(500).json({ message: 'Internal server error' });
    }
    
})
app.post("/login", async (req,res)=>{
    const email=req.body.email;
    const password=req.body.pass;   
    try{
        const user=await userDetails.findOne({email:email});
        
        if(user)
        {
            const isMatch=await bcrypt.compare(password,user.password);
            if(!isMatch)
            {
                res.send({message:"Invalid Password"})
            }
            else
            {
                const token=await user.generateAuthToken();
                res.cookie("usercookie",token,{
                    expires:new Date(Date.now()+9000000),
                    httpOnly:true,
                });
                const result={
                    user,
                    token
                }
                console.log(result.token)
                res.json({status:"Success",result})
            }
            
        }
        else{
            res.json({message:"Register Yourself First"})
        }
    }
    catch(e)
    {
        console.log(e);
    }
   
})

app.get("/validateuser",authenticate,async(req,res)=>{
    try{
        const validUserOne=await userDetails.findOne({_id:req.rootUser._id});
        res.status(201).json({status:201,message:"Validated",validUserOne});
    }   
    catch(e)
    {
        res.status(401).json({status:401,message:"Unauthorized no tokens provided"});
    }
    

})

app.get("/logout",authenticate,async(req,res)=>{
    try{
        req.rootUser.tokens=req.rootUser.tokens.filter((curelem)=>{
            return curelem.token!==req.token
        });
        res.clearCookie("usercookie",{path:"/login"})
        req.rootUser.save();
        res.status(201).json({status:201});
    }
    catch(e)
    {
        res.status(401).json({status:401,e});
    }
})

app.get("/",(req,res)=>{
    res.send("Hello");
    trekDetails.find({})
    .then(details=>res.json(details))
    .catch(err=>console.log(err))
    
});
app.get("/getTrek/:id",(req,res)=>{
    const id=req.params.id;
    trekDetails.findById({_id:id})
    .then(details=>res.json(details))
    .catch(e=>console.log(e))
});

app.listen(port,()=>{
    console.log(`Server is running ${port}`);
})
                            
