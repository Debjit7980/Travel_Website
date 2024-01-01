const mongoose=require('mongoose');
mongoose.connect("mongodb://127.0.0.1:27017/TravelDb",{useNewUrlParser:true,useUnifiedTopology:true});
const treks=new mongoose.Schema({
    name:String,
    imgUrl:String,
    descUrl:String,
})
const trekDetails=mongoose.model('collections',treks);
module.exports=trekDetails;
