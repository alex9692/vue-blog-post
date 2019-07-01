<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <router-link class="navbar-brand" to="/">
      <img src="../assets/logo.png" alt="Logo">
    </router-link>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav ml-auto">
        <li v-if="isAuthenticated" class="nav-item">
          <router-link class="nav-link" to="/articles/create">Create new Article</router-link>
        </li>
        <li v-if="!isAuthenticated" class="nav-item">
          <router-link class="nav-link" to="/login">Login</router-link>
        </li>
        <li v-if="!isAuthenticated" class="nav-item">
          <router-link class="nav-link" to="/signup">SignUp</router-link>
        </li>
        <li v-if="isAuthenticated" class="nav-item dropdown">
          <a
            class="nav-link dropdown-toggle"
            href="#"
            id="navbarDropdown"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >Hey {{userData.name}}!</a>
          <div class="dropdown-menu" aria-labelledby="navbarDropdown">
            <a @click="logout" class="dropdown-item" href="#">Logout</a>
          </div>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: "NavBar",
  data() {
    return {
      isAuth: false,
      userData: null
    };
  },
  mounted() {
    
    this.isAuth = this.$root.isAuth;
    this.userData = this.$root.auth.user;
  },
  computed: {
    isAuthenticated() {
      this.userData = this.$root.auth.user;
      this.isAuth = this.$root.isAuth;
      return this.isAuth;
    }
  },
  methods: {
    logout() {
      this.$noty.success("Logout Successfull");
      localStorage.removeItem("auth");
      this.$root.isAuth = false;
      this.$root.auth = {};
      this.isAuth = false;
      this.userData = null;
    }
  }
};
</script>



<style scoped>
img {
  width: 30px;
  height: 30px;
}
</style>
