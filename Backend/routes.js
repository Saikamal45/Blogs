const express=require('express');
const router=express.Router();
const {Blog,upload}=require('./dbconnection');

router.post('/uploading',upload.single('file'),async (req,res)=>{
  try {
    const blog =new Blog({
      title:req.body.title,
      fileName:req.file.originalname,
      filePath:req.file.originalname,
      content:req.body.content,
      author:req.body.author,
      createdate:req.body.date
    });
    await blog.save();
    res.json(blog);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to save image.' });
  }
});

/* Retrieving the blogs */
router.get('/get',async(req,res)=>{
  try {
    const allBlogs=await Blog.find().sort({createdAt:-1});
    console.log(allBlogs);
    res.send(allBlogs);
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch Blogs.' });
  }
});

/* Get a Specify Blog*/ 
router.get('/blog/:id',async(req,res)=>{
try {
  const singleBlog= await Blog.findById(req.params.id);
  if (!singleBlog) {
  
    return res.status(404).json({ message: 'Blog post not found.' });
    
  }
   res.json(singleBlog);
} catch (error) {
  console.log('Error Occured while fetching the blog.....');
}
});

/* Search Blog*/
router.get('/searching',async(req,res)=>{
  try {
    const searchQuery=req.query.title.toLowerCase();
    const blogs= await Blog.find({title: {$regex:searchQuery, $options:'i'}});
    res.json(blogs);
  } catch (error) {
    console.log('Error in searching Blogs......');
  }
})
module.exports = router;