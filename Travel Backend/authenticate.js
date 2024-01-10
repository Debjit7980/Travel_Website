const jwt=require("jsonwebtoken");
const { MongoClient,ObjectId } = require('mongodb');
//const {collective}=require("./userDB");
const secretKey="debjitsingharoy"
const uri = 'mongodb+srv://debjitsingharoy007:O2b13SGjjeIUJ4Jg@cluster0.gdcevv7.mongodb.net/?retryWrites=true&w=majority';

const client = new MongoClient(uri);
let collective;

client.connect().then(() => {
  const db = client.db('TravelDb');
  collective = db.collection('userdbs');
}).catch(err => console.error(err));

//const email="efg@gmail.com";
const authenticate=async(req,res,next)=>{
    try{
        console.log("Token is:",req.headers.authorization);
        const token=req.headers.authorization;
        const verifyToken=jwt.verify(token,secretKey);
        console.log("Verify:",verifyToken);
        const id=verifyToken._id;
        //console.log(id);
        //console.log("User is: ",await collective.findOne({_id:new ObjectId(id)}));
        const rootUser=await collective.findOne({_id:new ObjectId(id)});
        console.log("Root User:",rootUser);
        if(!rootUser){
            throw new Error("User not found")
        }
        req.token=token;
        req.rootUser=rootUser;
        req.userId=rootUser._id;
        //console.log(req.userId);
        next();
    }
    catch(e)
    {
        console.log(e);
        
    }
}

module.exports=authenticate