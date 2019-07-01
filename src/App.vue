<template>
  <div id="app">
    <NavBar/>
    <div class="container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";

export default {
  name: "app",
  components: {
    NavBar
  }
};
</script>

<style>
* {
  font-family: "Poppins", Helvetica, Arial, sans-serif;
}

body {
  background-color: #f5f3ef;
}
</style>
