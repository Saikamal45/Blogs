<template>
  <h1 id="heading">Kamal's Blog</h1>
  <div class="content">
  <div class="para">
    Blog writing is a vital communication tool in the digital age. It enables individuals and businesses to share knowledge, establish credibility, and engage audiences globally. Blogs serve as educational resources, foster communities, and influence change. They offer a democratic platform for diverse voices and enrich our online landscape with valuable information and insights.
  </div>
  <div class="image">
    <img src="https://content-writing-india.com/blog/wp-content/uploads/2018/03/1080px.jpg" alt="ImagenotFound">
  </div>
  </div>
 <div class="blog-details" v-if="blog">
    <div class="box">
      <h1>{{ blog.title }}</h1>
    <h2>Author: {{ blog.author }}</h2>
      <p>Posted On: {{ blog.createdate }}</p>
  <img :src="getImageUrl(blog.filePath)" alt="imagenotFound">
  <br><br>
    {{ blog.content }}
    </div>
  </div>
</template>
<script>
import axios from 'axios';

export default{
  data() {
    return {
      blog:null
    }
  },
  mounted(){
    this.fetchBlogDetails();
  },
  methods:{
    getImageUrl(filePath) {
      const filename = filePath.split('/').pop();
      return `http://localhost:3000/Files/${filename}`;
  },
    async fetchBlogDetails(){
      try {
        if (this.$route.params.id){
        console.log('Blog ID:', this.$route.params.id);
        const response=await axios.get(`http://localhost:3000/blog/${this.$route.params.id}`);
        this.blog=response.data;
        console.log(this.blog);
        }
      } catch (error) {
        console.log('Error in fetchingBlogDetails.......');
      }
    }
  },
  
};
</script>
<style>

p{
  color: blue;
}
.box
{
  width:80%;
  height:800px;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.5);
  position: absolute;
  left:100px;
  top:400px;
  padding: 0 50px;
}
.box img{
  width: 70%;
  height: 400px;
  padding-left:100px;
}
.image img{
  width:500px;
  height:300px;
  position: absolute;
  right:100px;
  top:80px;
}
.image{
  flex:1;
  text-align: center;
} 
.para
{
  flex:1;
  padding-top: 150px;
  padding-left: 100px;
  font-weight: bold;
}
.content {
  display: flex;
  align-items: center; /* Vertically align content */
}
</style>