//const mongoose=require('mongoose');
//const bcrypt=require('bcryptjs');
const jwt = require('jsonwebtoken');
const { MongoClient, ObjectId } = require('mongodb');
//mongoose.connect("")
const uri = 'mongodb+srv://debjitsingharoy007:O2b13SGjjeIUJ4Jg@cluster0.gdcevv7.mongodb.net/?retryWrites=true&w=majority';

const secretKey = "debjitsingharoy";
/*const users=new mongoose.Schema({
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
})*/

const client = new MongoClient(uri);
let collective;

client.connect().then(() => {
    const db = client.db('TravelDb');
    collective = db.collection('userdbs');
    blogs=db.collection('blogsCollection');
}).catch(err => console.error(err));

const validUser = (userData) => {
    // Implement your schema validation logic here
    if (!userData.username || !userData.email || !userData.password) {
        throw new Error('Invalid user data. Missing required fields.');
    }
};

const createUser = async (userData) => {
    try {
        // Check if the email already exists
        validUser(userData);
        // If email is not found, proceed with user creation
        const result = await collective.insertOne(userData);
        console.log('User registered successfully:', userData);
        console.log('User registered successfully:', result);
        return result;
    }
    catch (error) {
        console.log("Error in userDB is:", error);
    }
};

const createBlogs = async (blogData) => {
    try {
        // Check if the email already exists
        // If email is not found, proceed with user creation
        const result = await blogs.insertOne(blogData);
        console.log('Blog inserted:', blogData);
        //console.log('User registered successfully:', result);
        return result;
    }
    catch (error) {
        console.log("Error in userDB is:", error);
    }
};

const generateAuthToken = async (userId) => {
    try {
        const token = jwt.sign({ _id: userId }, secretKey, {
            expiresIn: "1d"
        });
        const users = await collective.findOne({ _id: new ObjectId(userId) });
        if (!users.tokens) {
            await collective.updateOne(
                { _id: new ObjectId(userId) },
                { $set: { tokens: [] } }
            );
        }
        const result = await collective.updateOne(
            { _id: new ObjectId(userId) },
            { $push: { tokens: token } }
        );

        if (result.modifiedCount === 0) {
            throw new Error('User not found or token not stored');
        }
        const updatedUser = await collective.findOne({ _id: new ObjectId(userId) });
        console.log('Updated Tokens:', updatedUser.tokens);
        return token;
    } catch (e) {
        console.log(e);
        throw new Error('Error generating authentication token');
    }
};
/*user.methods.generateAuthToken=async function()
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
}*/


//const userDetails=mongoose.model('userdbs',users);

module.exports = { createUser, generateAuthToken, collective,createBlogs,};
