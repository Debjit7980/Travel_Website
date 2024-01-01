const mongoose=require('mongoose');
const bcrypt=require('bcryptjs');
const jwt = require('jsonwebtoken');
mongoose.connect("mongodb+srv://debjitsingharoy007:O2b13SGjjeIUJ4Jg@cluster0.gdcevv7.mongodb.net/?retryWrites=true&w=majority/TravelDb",{useNewUrlParser:true,useUnifiedTopology:true});

const secretKey="debjitsingharoy"
const users=new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    tokens:[
        {
            token:{
                type:String,
                required:true,
            }
        }
    ]

})
users.pre("save", async function(next){
    if(this.isModified("password"))
    {
        this.password=await bcrypt.hash(this.password,12)
    }
    next()  
})
users.methods.generateAuthToken=async function()
{
    try{
        let token23=jwt.sign({_id:this._id},secretKey,{
            expiresIn:"1d"
        });
        this.tokens=this.tokens.concat({token:token23});
        await this.save();
        return token23;
    }
    catch(e)
    {
        console.log(e)
    }
}


const userDetails=mongoose.model('userDB',users);

module.exports=userDetails;
