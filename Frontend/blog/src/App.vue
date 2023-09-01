<template>
 <div id="app">
  <UploadBlog v-if="!$route.name || $route.name !== 'blog-details'" />
    <RouterView></RouterView>
  </div>
</template>

<script>
import UploadBlog from './components/UploadBlog.vue';
export default {
  name: 'App',
  components: {
    UploadBlog,
  },
};

</script>

<style>

</style>
