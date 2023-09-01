<template>
  <h1 id="heading">Kamal's Blog</h1>
  <div class="nav">
    <ul class="navbar">
      <li><a href="#" @click="openModal('uploadblog')">UploadBlog</a></li>
      <li><a href="#" @click="openModal('searchblogs')">SearchBlog</a></li>
    </ul>
  </div>

<!-- UploadBlog MOdal-->
<div class="blog" id="uploadblog">
  <div class="modal-content">
  <span class="close" @click="closeModal('uploadblog')">&times;</span>
  <h1>Write a Blog</h1>
  <form enctype="multipart/form-data">
      <label for="title">Blog Title :</label>
      <input type="text" placeholder="Enter Blog Title" id="title" required v-model="title"><br>
     <label for="image">Upload Pic For Blog :</label>
      <input type="file" id="image" ref="fileInput" required @change="handleImageUpload"><br>
      <label for="content">Write Content For Your Blog :</label><br>
      <textarea id="content" placeholder="Enter Your Context" required v-model="content"></textarea><br>
     <label for="author">Author Name :</label><br>
    <input id="author" type="text" placeholder="Enter Author Name" required v-model="author"><br>
    <label for="createdat">Give Date At The Time Of Uploading Blog :</label>
    <input id="createdat" type="date" required v-model="date"><br><br>
    <button @click.prevent="UploadBlog">UploadBlog</button>
  </form>
  <p class="msg">{{ message }}</p> 
  </div>
</div>

  <!-- Search Blogs Modal-->
<div class="blog" id="searchblogs">
  <div class="modal-content">
    <span class="close" @click="closeModal('searchblogs')">&times;</span>
    <h1>Search Blogs</h1>
    <input type="text" placeholder="Search" id="search" v-model="searchQuery">
    <button @click="searchBlogs" id="btn">Search</button>
    </div>
    </div>
    

<!-- Search Results Modal -->
<div class="blog" id="searchresults" v-if="hasSearched">
  <div class="modal-content">
    <span class="close" @click="closeModal('searchresults')">&times;</span>
    <h1>Search Results</h1>

    <div class="searchresult" v-if="searchResults.length > 0">
      <div v-for="(blog, index) in searchResults" :key="index">
        <img :src="getImageUrl(blog.filePath)" alt="imagenotFound">
        <h5>{{ blog.title }}</h5>
        <h4>Created By: {{ blog.author }}</h4>
        <p @click.prevent="openBlogDetails(blog)">Read Article</p>
      </div>
    </div>
    <div class="no-results" v-else>
      <p>No results found for your search.</p>
    </div>
  </div>
</div>

    <!--Display Blogs-->
    <div class="blogs">
      <div class="second">
     <div class="blogdis" v-for="(blog,index) in uploadedBlogs" :key="index">
      <img :src="getImageUrl(blog.filePath)" alt="imagenotFound">
      <h1>{{ blog.title }}</h1>
      <h4>PostedOn:{{blog.createdate }}</h4>
      <p @click.prevent="openBlogDetails(blog)">Read Article</p>
      </div>
      </div>
      </div>
</template>
<script>
import axios from 'axios';
export default{
  data(){
    return{
      UploadBlogModalOpen: false,
      searchBlogModalOpen:false,
      searchResultsModalOpen:false,
      title:'',
      content:'',
      author:'',
      date:'',
      selectedFile:null,
      message:'',
      uploadedBlogs:[],
      searchQuery: '',
      searching:false,
      hasSearched:false,
      searchResults:[]
    }
  },
  computed: {
    filteredBlogs() {
      const searchQuery = this.searchQuery.toLowerCase();
      if (!searchQuery) {
        return [];
      }
      return this.uploadedBlogs.filter((blog) =>
        blog.title.toLowerCase().includes(searchQuery)
      );
    },
  },

  mounted() {
      this.fetchBlogs();
    },
  methods: {
    resetForm(){
      this.title='';
      this.content='';
      this.author='';
      this.date='';
      this.message='';
      this.selectedFile=null;
      this.$refs.fileInput.value = null;
      this.hasSearched='';
    },
    openBlogDetails(blog){
      console.log('Navigating to blog details with ID:', blog._id);
      this.$router.push({ name: 'blog-details', params: { id: blog._id } });
    },
    openModal(modalId){
     
      if(modalId==='uploadblog'){
        this.UploadBlogModalOpen=true;
        document.getElementById('uploadblog').style.display='block';
        this.resetForm();
      }
      else if(modalId==='searchblogs') 
      {
        document.getElementById('searchblogs').style.display='block';
        this.searchBlogModalOpen=true;
        this.resetForm();
        this.searchQuery='';
      } 
      else if (modalId === 'searchresults') { 
       this.searchResultsModalOpen=true;
    document.getElementById('searchresults').style.display = 'block';
  }
    },
    closeModal(modalId)
    {
      if(modalId==='uploadblog'){
      this.UploadBlogModalOpen=false;
      document.getElementById('uploadblog').style.display='none';
      this.resetForm();
    }
    else if(modalId==='searchblogs')
    {
       document.getElementById('searchblogs').style.display='none';
       this.searchBlogModalOpen=false;
       this.resetForm();
       this.searchQuery='';
    }
    else if (modalId === 'searchresults') { 
      this.searchResultsModalOpen=false;
    document.getElementById('searchresults').style.display = 'none';
    this.hasSearched=false;
  }
  },
  handleImageUpload(event){
    this.selectedFile=event.target.files[0];
  },
  getImageUrl(filePath) {
      const filename = filePath.split('/').pop();
        return `http://localhost:3000/Files/${filename}`;
      
    },

    async UploadBlog(){
      if (!this.selectedFile) {
    console.error('No file selected for upload');
    return;
  }
      console.log('UploadBlog method called');
      const formData=new FormData();
      formData.append('title',this.title);
      formData.append('file',this.selectedFile);
      formData.append('filename',this.selectedFile.name);
      formData.append('filepath',this.selectedFile.name);
      formData.append('content',this.content);
      formData.append('author',this.author);
      formData.append('date',this.date);

      try {
        const response= await fetch('http://localhost:3000/uploading',{
           method:'Post',
           body: formData,
        });
        if(response.ok){
          const newBlog = await response.json();
          this.uploadedBlogs.unshift(newBlog);
          console.log('Blog Uploaded Sucessful');
          this.message="Blog Uploaded Sucessful";
          this.title='';
          this.content='';
          this.author='';
          this.date='';
          this.selectedFile=null;
          this.$refs.fileInput.value = null;
        }
        else{
          console.log('Blog Uploading Failed..........');
          this.message="Blog Uploading Failed..";
        }
      } catch (error) {
        console.error('Error in uploading Blog', error);
      }
    },
    async fetchBlogs(){
      try {
        const response=await axios.get('http://localhost:3000/get');
        this.uploadedBlogs = response.data.sort((a, b) => {
      return new Date(b.createdate) - new Date(a.createdate);
        });
        console.log('success in blog fetching........')
      } catch (error) {
        console.log('Error in fetching blogs......');
      }
    },
    async searchBlogs() {
  try {
    const response = await axios.get('http://localhost:3000/searching', {
      params: { title: this.searchQuery },
    });

    this.searchResults = response.data;
    this.hasSearched=true;
    this.openModal('searchresults');
  } catch (error) {
    console.error('Error searching blogs:', error);
  }
},

    
  },
}
</script>
<style>
body{
  margin:0;
  padding: 0;
}
  .nav {
    width: 100%;
    height: 50px;
    background-color: green;
    position: absolute;
    top:70px;
  }
  .nav ul{
    list-style-type: none;
    display: flex;
  }
  .nav li{
    position:relative;
    left:1000px;
    font-size: 30px;
    padding-right: 30px;
  }
  #heading{
    text-align: center;
    position: absolute;
    top:0px;
    left:600px;
  }
  #logo
  {
    width:70px;
    height:30px;
    border-radius: 50%;
    position: relative;
    left:520px;
    top:23px;
  }
  h2,h1{
    text-align: center;
  }

  .blog
  {
    display: none;
    position: fixed;
    left:500px;
    top:80px;
    width:40%;
    height:800px;
    overflow:hidden;
    z-index:1;
    font-size: 20px;
    
  }  
  .modal-content
{
  background-color: #f7f7f7;
  margin: 10% auto;
  padding:20px;
  border:1px solid #888;
  width:90%;
  border-radius: 10px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
  position: relative;
  max-height: 100vh;
  overflow-x: hidden;
}
  input[type="text"],[type="submit"],[type="file"],button,textarea{
    width: 80%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 16px;
    margin-bottom: 15px;
  }
span{
  float:right;
  font-size: 30px;
}
span:hover{
  color:red;
}
.msg{
  text-align: center;
  color: green;
}
.blogs {
  text-align: center;
  margin-top: 40px;
  position:absolute;
  top:100px;
  display: flex;
  flex-wrap: wrap;
} 
.blogdis {
  display: inline-block;
  margin:50px;
  padding:10px;
  position: relative;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.5);
}
.blogdis p{
  position:relative;
  left:150px;
  bottom:-20px;
}
.blogdis h4{
  position:absolute;
  left:10px;
}
.blogs img{
  height:40vh;
  width:100%;
  border-radius:1%;
}
#searchblogs{
  width:400px;
}
/*search results */
#search, #btn
  {
    border-radius:20px;
  }
  #btn:hover{
    background-color: green;
  }
  .searchresult img{
    width:50%;
    height:auto;
  }
  .searchresult h5{
    position:relative;
    bottom:150px;
    left:270px;
  }
  .searchresult h4{
    position:relative;
    bottom:160px;
    left:270px;
  }
  .searchresult p{
    position:relative;
    bottom:180px;
    left:270px;
  }
  .no-results p{
    color: red;
    position: relative;
    top:30px;
    left:30px;
  }
  #searchresults
  {
    width:600px;
  }
  </style>