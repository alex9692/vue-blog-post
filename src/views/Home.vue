<template>
  <div>
    <div class="d-flex justify-content-between mt-4" v-if="articles">
      <button @click="getArticles(articles.prev_page_url)" :disabled="!articles.prev_page_url" class="btn btn-warning">Prev</button>
      <button @click="getArticles(articles.next_page_url)" :disabled="!articles.next_page_url" class="btn btn-warning">Next</button>
    </div>
    <div v-if="!loading">
      <div class="row" v-if="articles">
      <div class="col-md-8 offset-md-2" v-for="article in articles.data" :key="article.id">
        <Article :article="article" />
      </div>
    </div>
    </div>
            <div class="loader text-center" v-else>
          <i class="fas fa-3x fa-spin fa-spinner" v-if="loading"></i>
        </div>
  </div>
</template>


<script>
import axios from "axios";

import config from "../config";
import Article from "../components/Article.vue";

export default {
  name: "Home",
  components: {
    Article
  },
  mounted() {
    this.getArticles();
  },
  data() {
    return {
      articles: null,
      loading: false
    };
  },
  methods: {
    getArticles(url = `${config.apiUrl}/articles`) {
      this.loading = true;
      axios.get(url).then(response => {
      this.loading = false;
        this.articles = response.data.data;
      });
    }
  }
};
</script>
