import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router';
import UploadBlog from './components/UploadBlog.vue';
import BlogDetails from './components/BlogDetails.vue';

const routes = [
  {path: '/', component:UploadBlog },
  {path:'/blog/:id',name: 'blog-details',component:BlogDetails,props:true,},
  {path:'/Searching',name:'search',component:UploadBlog}
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const app = createApp(App);
app.use(router);
app.mount('#app');
