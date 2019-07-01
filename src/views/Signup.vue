<template>
  <div class="row my-5">
    <div class="col-md-6 offset-md-3">
      <div class="card">
        <div class="card-body">
          <h3 class="text-center my-4">Signup</h3>
          <div class="form-group">
            <label>Name</label>
            <input
              :class="{'is-invalid': errors.name, 'is-valid': !errors.name && this.submitted}"
              placeholder="Name"
              type="text"
              v-model="name"
              class="form-control"
            />
            <div class="errors" v-if="errors.name">
              <small class="text-danger" v-for="error in errors.name" :key="error">{{error}}</small>
            </div>
          </div>
          <div class="form-group">
            <label>Email</label>
            <input
              :class="{'is-invalid': errors.email, 'is-valid': !errors.email && this.submitted}"
              placeholder="Email"
              type="email"
              v-model="email"
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
              placeholder="Password"
              type="password"
              v-model="password"
              class="form-control"
            />
            <div class="errors" v-if="errors.password">
              <small class="text-danger" v-for="error in errors.password" :key="error">{{error}}</small>
            </div>
          </div>
          <div class="form-group text-center">
            <button :disabled="loading" @click="registerUser" class="btn btn-success form-control">
              <i class="fas fa-spin fa-spinner" v-if="loading"></i>
              {{ loading ? '' : 'Signup' }}
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
  name: "Signup",
  data() {
    return {
      name: "",
      email: "",
      password: "",
      errors: {},
      submitted: false,
      loading: false
    };
  },
  methods: {
    registerUser() {
      this.loading = true;
      const userData = {
        name: this.name,
        email: this.email,
        password: this.password
      };

      axios
        .post(`${config.apiUrl}/auth/register`, userData)
        .then(({ data }) => {
          this.loading = false;
          this.submitted = true;
          let { data: authUserData } = data;
          localStorage.setItem("auth", JSON.stringify(authUserData));
          this.$root.auth = authUserData;
          this.$noty.success("Signup Successfull");
          this.$router.push("login");
        })
        .catch(({ response }) => {
          this.$noty.error("Signup Failed! Please try again");
          this.loading = false;
          this.submitted = true;
          this.errors = { ...response.data };
        });
    }
  }
};
</script>
