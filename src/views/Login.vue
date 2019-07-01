<template>
  <div class="row my-5">
    <div class="col-md-6 offset-md-3">
      <div class="card">
        <div class="card-body">
          <h3 class="text-center my-4">Login</h3>
          <div class="form-group">
            <label>Email</label>
            <input
              :class="{'is-invalid': errors.email, 'is-valid': !errors.email && this.submitted}"
              v-model="email"
              placeholder="Email"
              type="email"
              class="form-control"
            />
            <div class="errors" v-if="errors.email">
              <small class="text-danger" v-for="error in errors.email" :key="error">{{error}}</small>
            </div>
          </div>
          <div class="form-group">
            <label>Password</label>
            <input
              :class="{'is-invalid': errors.password, 'is-valid': !errors.password && this.submitted}"
              v-model="password"
              placeholder="Password"
              type="password"
              class="form-control"
            />
            <div class="errors" v-if="errors.password">
              <small class="text-danger" v-for="error in errors.password" :key="error">{{error}}</small>
            </div>
          </div>
          <div class="form-group text-center">
            <button @click="loginUser" class="btn btn-success form-control">
              <i class="fas fa-spin fa-spinner" v-if="loading"></i>
              {{ loading ? '' : 'Login' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import config from "../config";

export default {
  beforeRouteEnter(to, from, next) {
    if (localStorage.getItem("auth")) {
      return next({ path: "/" });
    }

    next();
  },
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
      errors: {},
      submitted: false,
      loading: false
    };
  },
  methods: {
    loginUser() {
      //   const { email } = this.$root.auth.user;
      //   if (email === this.email) {
      // this.$root.isAuth = true;
      // this.$router.push("home");
      //   }
      this.loading = true;
      const userData = {
        email: this.email,
        password: this.password
      };

      axios
        .post(`${config.apiUrl}/auth/login`, userData)
        .then(({ data }) => {
          this.errors = {};
          this.loading = false;
          this.submitted = true;
          this.$root.isAuth = true;
          let { data: authUserData } = data;
          localStorage.setItem("auth", JSON.stringify(authUserData));
          this.$root.auth = authUserData;
          this.$noty.success("Login Successfull");
          this.$router.push("/");
        })
        .catch(({ response }) => {
          this.$noty.error("Login Failed! Please try again");
          this.loading = false;
          this.submitted = true;
          if (response.status == 401) {
            this.errors.email = ["These credentials do not match our records."];
          } else {
            this.errors = response.data;
          }
        });
    }
  }
};
</script>
