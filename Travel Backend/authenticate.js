const jwt=require("jsonwebtoken");
const userdb=require("./userDB");
const secretKey="debjitsingharoy"

const authenticate=async(req,res,next)=>{
    try{
        const token=req.headers.authorization;
        const verifyToken=jwt.verify(token,secretKey);
        const rootUser=await userdb.findOne({_id:verifyToken._id})
        if(!rootUser){
            throw new Error("User not found")
        }
        req.token=token;
        req.rootUser=rootUser;
        req.userId=rootUser._id;
        next();
    }
    catch(e)
    {
        console.log(e);
    }
}

module.exports=authenticate