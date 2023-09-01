const mongoose=require('mongoose');
const multer=require('multer');
const path=require('path');
const blogschema=new mongoose.Schema(
  {
  title:{type:String ,required:true},
  content:{type:String},
  author:{type:String},
  createdate:{type:String},
  fileName:{type:String},
  filePath:{type:String}
  }
);

const Blog=mongoose.model('Blog',blogschema);

mongoose.connect('mongodb+srv://Kamal:Saikamal@cluster0.gzq7nmj.mongodb.net/?retryWrites=true&w=majority'
, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', (error) => {
  console.error('MongoDB connection error:', error);
});

db.once('open', () => {
  console.log('Connected to MongoDB');
});
const storage=multer.diskStorage({
  destination:(req,file,cb)=>{
    cb(null,"/home/bl1001/Desktop/Task/Backend/Files/");
  },
  filename:(req,file,cb)=>{
    return cb(null,file.originalname);
  }
});
const upload=multer({storage:storage});

module.exports = {db,Blog,upload};
