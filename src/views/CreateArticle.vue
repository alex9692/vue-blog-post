<template>
  <div class="container">
    <div class="row">
      <div class="col-md-8 offset-md-2">
        <div class="card my-5">
          <div class="card-body">
            <picture-input
              @change="onChange"
              accept="image/jpeg, image/png"
              size="5"
              buttonClass="btn btn-danger"
            ></picture-input>
            <select class="form-control my-4" v-model="category">
              <option selected value>Select a Category</option>
              <option
                :value="category.id"
                v-for="category in categories"
                :key="category.id"
              >{{category.name}}</option>
            </select>
            <input v-model="title" type="text" class="form-control mb-3" placeholder="title" />
            <wysiwyg v-model="content" />
            <div class="text-center">
              <button @click="createArticle" class="btn btn-success btn-lg mt-3 form-control">
                <i class="fas fa-spin fa-spinner" v-if="loading"></i>
                {{ loading ? '' : 'Create Article' }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PictureInput from "vue-picture-input";
import config from "../config";
import axios from "axios";

export default {
  beforeRouteEnter(to, from, next) {
    if (!localStorage.getItem("auth")) {
      return next({ path: "/login" });
    }

    next();
  },
  components: {
    PictureInput
  },
  data() {
    return {
      title: "",
      content: "",
      image: null,
      categories: null,
      category: "",
      loading: false
    };
  },
  mounted() {
    this.getCategories();
  },
  methods: {
    onChange(image) {
      this.image = image;
    },
    createArticle() {
      if (!this.title || !this.content || !this.image || !this.category) {
        this.$noty.error("Please fill in all your details");
        return;
      }
      this.loading = true;
      const form = new FormData();
      form.append("file", this.image);
      form.append("upload_preset", "ml_default");
      form.append("api_key", "874526519736569");

      axios
        .post("https://api.cloudinary.com/v1_1/dweyr8r0r/image/upload", form)
        .then(response => {
          const configData = {
            title: this.title,
            content: this.content,
            category_id: this.category,
            imageUrl: response.data.secure_url
          };
          axios
            .post(`${config.apiUrl}/articles`, configData, {
              headers: {
                Authorization: `Bearer ${this.$root.auth.token}`
              }
            })
            .then(res => {
              this.loading = false;
              console.log(res);
              this.$noty.success("Article  created successfully");
              this.$router.push("/");
            })
            .catch(() => {
              this.loading = false;
              this.$noty.error("Something went wrong");
            });
        })
        .catch(() => {
          this.loading = false;
          this.$noty.error("Something went wrong");
        });
    },
    getCategories() {
      const categories = JSON.parse(localStorage.getItem("categories"));
      if (!categories) {
        axios.get(`${config.apiUrl}/categories`).then(res => {
          this.categories = res.data.categories;
          localStorage.setItem("categories", JSON.stringify(this.categories));
        });
      } else {
        this.categories = categories;
      }
    }
  }
};
</script>
    