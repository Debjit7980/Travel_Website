const { MongoClient,ObjectId } = require('mongodb');
const uri = 'mongodb+srv://debjitsingharoy007:O2b13SGjjeIUJ4Jg@cluster0.gdcevv7.mongodb.net/?retryWrites=true&w=majority';

const client = new MongoClient(uri);
let treks;

const trekDetails=client.connect().then(() => {
  const db = client.db('TravelDb');
  treks = db.collection('collections');
}).catch(err => console.error(err));

module.exports={trekDetails,treks};
/*const treks=new mongoose.Schema({
    name:String,
    imgUrl:String,
    descUrl:String,
})*/
//const trekDetails=mongoose.model('collections',treks);

