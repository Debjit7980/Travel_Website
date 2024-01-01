const mongoose=require('mongoose');
mongoose.connect("mongodb+srv://debjitsingharoy007:O2b13SGjjeIUJ4Jg@cluster0.gdcevv7.mongodb.net/?retryWrites=true&w=majority/TravelDb",{useNewUrlParser:true,useUnifiedTopology:true});
const treks=new mongoose.Schema({
    name:String,
    imgUrl:String,
    descUrl:String,
})
const trekDetails=mongoose.model('collections',treks);
module.exports=trekDetails;
