//const mongoose=require('mongoose');
const express=require('express');
const cors=require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const cookieParser=require('cookie-parser');
const bodyParser=require('body-parser');
const path = require('path');
const multer = require('multer');
//const {trekDetails,treks}=require('./model');
//const userDetails=require('./userDB');
const { createUser,generateAuthToken, createBlogs} = require('./userDB');
const authenticate=require("./authenticate");
const { MongoClient,ObjectId } = require('mongodb');
const app=express();
app.use(bodyParser.urlencoded({extended : false}));
app.use(express.json());
app.use(cookieParser());
/*app.use(cors({
  origin: 'https://localhost:3000', // Replace with your frontend's actual origin
  methods: ['POST', 'GET'],
  credentials: true,
}));*/
//app.use(cors());

const uri = "mongodb+srv://debjitsingharoy007:O2b13SGjjeIUJ4Jg@cluster0.gdcevv7.mongodb.net/?retryWrites=true&w=majority"; // Replace with your MongoDB Atlas connection string
const dbName = "TravelDb"; // Replace with your database name
const collectionName = "collections";



console.log("Connected to MongoDB");
const client = new MongoClient(uri);
const db = client.db(dbName);
const preusers=db.collection("userdbs");
const blogs=db.collection("blogsCollection");

//mongoose.connect("mongodb+srv://debjitsingharoy007:O2b13SGjjeIUJ4Jg@cluster0.gdcevv7.mongodb.net/?retryWrites=true&w=majority/TravelDb")
const port=process.env.PORT|| 8000;
//trekDetails.createIndexes();
const allowedOrigins=['https://naturesdeck-trekcamp-app.onrender.com','http://localhost:3000'];
app.use(cors({
    origin: allowedOrigins ,  // Replace with your client's actual origin
    credentials: true,
}));
/*app.post("/signup",async (req,res)=>{
    //res.send("signup");
    try{
        console.log("signup");
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
    
})*/

app.post("/signup",async(req,res)=>{
    try {
        //console.log('Received request:', req.body);
        const username =req.body.name;
        const email=req.body.email;
        const password=req.body.pass;
        //console.log("User is:",email,password,username);
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
    
        // Create a new user object
        const newUser = {
          username,
          email,
          password: hashedPassword,
        };
        const existingUser = await preusers.findOne({ email:email });
        console.log("Existing USer:",existingUser);
        if (existingUser) {
          console.log('User with this email already exists');
          res.status(400).json({status:400, message: 'User with this email already registered' });
        }
        else{
            await createUser(newUser);
    
            res.status(201).json({status:201, message: 'User registered successfully' });
        }
        // Save the user to the database
     
    } 
    catch (error) {
        console.error('Error during signup:', error); // Log the error

        /*if (error.message === 'User with this email already exists') {
            res.status(400).json({ error: 'User with this email already registered' });
        } 
        else {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }*/
    }
})
app.post("/login", async (req,res)=>{
    //res.send("login");
    const email=req.body.email;
    const password=req.body.pass;   
    try{
        
        console.log("login");
        //const user=await userDetails.findOne({email:email});
        const user=await preusers.findOne({email:email});
        console.log("User is:",user);
        if(user)
        {
            const isMatch=await bcrypt.compare(password,user.password);
            console.log("Match:",isMatch);
            if(!isMatch)
            {
                res.send({message:"Invalid Password"})
            }
            else
            {
                const token=await generateAuthToken(user._id);
                res.cookie("usercookie",token,{
                    expires:new Date(Date.now()+9000000),
                    httpOnly:true,
                });
                const response={
                    user,
                    token
                }
                console.log(response.token)
                res.status(201).json({status:201,message:"Logged In",response});
            }
            
        }
        else{
            res.send({status:401,message:"Register Yourself First"})
        }
    }
    catch(error)
    {
        console.error(error);
    }
   
})

app.get("/validateuser",authenticate,async(req,res)=>{
    try{
        console.log("in Index",req.rootUser._id);
        const validUserOne=await preusers.findOne({_id:new ObjectId(req.rootUser._id)});
        console.log("valid User:",validUserOne);
        res.status(201).json({status:201,message:"Validated",validUserOne});
    }   
    catch(e)
    {
        res.status(401).json({status:401,message:"Unauthorized no tokens provided"});
    }
    

})

app.get("/logout",authenticate,async(req,res)=>{
    try{
        console.log("Tokens array:",req.rootUser.tokens);
        /*req.rootUser.tokens=req.rootUser.tokens.filter((curelem)=>{
            return curelem.token!==req.token
        });*/
        req.rootUser.tokens = req.rootUser.tokens.filter((token) => token !== req.token);
        console.log("Logout token:",req.rootUser.tokens);
        res.clearCookie("usercookie",{path:"/login"})
        //await req.rootUser.save();
        await preusers.updateOne(
            { _id: new ObjectId(req.rootUser._id) },
            { $set: { tokens: req.rootUser.tokens } }
        );
        res.status(201).json({status:201});
    }
    catch(e)
    {
        //res.status(401).json({status:401,e});
        return res.status(401).json({ error: "Authentication failed", details: e.message });
    }
})

/*app.get("/",(req,res)=>{
    //res.send("Hello");
    trekDetails.find({})
    .then(details=>res.json(details))
    .catch(err=>console.log(err))
    
});*/
app.get("/", async (req, res) => {
    try {
      await client.connect();
      const collection = db.collection(collectionName);
      const cursor = collection.find({});
      const documents = await cursor.toArray();
      console.log("Retrieved documents");
      console.log(documents);
      res.json(documents);
    } catch(e){
      console.log(e);
    }
});
app.get("/getTrek/:id",async (req,res)=>{
    try {
        const id=req.params.id;
        await client.connect();
        const treks=db.collection('collections');
        const doc=await treks.findOne({_id:new ObjectId(id)});
        res.json(doc);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
  
});

app.post('/addBlog', async (req, res) => {
    try 
    {
        const {id,Del_id,title, content,username, dateTime } = req.body;
        const newBlog={
            id,
            Del_id,
            title,
            content,
            username,
            dateTime
        }
        await createBlogs(newBlog);
        res.status(201).json({status:201, message: 'Blog inserted' });
    } 
    catch (error) 
    {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/allBlogs', async (req, res) => {
try {
    const allBlogs = await blogs.find({}).toArray();
    console.log(allBlogs);
    res.json(allBlogs);
} catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
}
});
app.delete('/removeBlog/:blogId', async (req, res) => {
    const blogId = req.params.blogId;
  
    try {
        const re=await blogs.findOne({_id:new ObjectId(blogId)});
        console.log("Found Data:",re);
        const result=await blogs.deleteOne({_id:new ObjectId(blogId)});
        console.log(result);
        if(result.deletedCount===1)
        {
            res.status(200).json({ message: 'Blog removed successfully' });
        }
        else{
            console.log("Blog can not be Removed");
        }
      
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
});

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const uploadPath = path.join(__dirname,'..','travel-app','public','Uploads');
      cb(null, uploadPath);
      console.log('Upload Path:', uploadPath);
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}_${file.originalname}`);
    },
  });
  
const upload = multer({ storage });

app.post('/uploadProfilePicture', upload.single('profilePicture'), async (req, res) => {
    try {
        // Check if a file is provided
        if (!req.file) {
            return res.status(400).json({ error: 'No file provided' });
        }

        const userId = req.body.userId; // Extract user ID from the request body
        console.log('Request Body:', req.body);
        // Update the user's document with the new profile picture

        //const userFilter = { userId };
        
        //const userFilter = { _id: ObjectId(userId) };
        const existingUser = await preusers.findOne({_id:new ObjectId(userId)});
        //console.log('User Filter:', userFilter);
        console.log('Existing User:', existingUser);
        const update = { $set: { profilePicture: req.file.path } };
        console.log("update",update);
        const result = await preusers.updateOne({_id:new ObjectId(userId)}, update);
        console.log('Updated user document:', result);

        if (result.modifiedCount === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        return res.status(200).json({ message: 'Profile picture uploaded successfully' });
    } catch (error) {
        console.error('Error uploading profile picture:', error);
        return res.status(500).json({ error: 'Internal Server Error',details:error.message});
    }
});

app.listen(port,()=>{
    console.log(`Server is running ${port}`);
})
                            
