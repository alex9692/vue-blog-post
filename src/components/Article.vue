<template>
  <div class="card my-3">
    <div class="card-header font-weight-bolder">{{article.title}}</div>
    <div class="card-body">
      <div v-html="article.content.substring(0, 200)" class="my-3"></div>

      <router-link :to="`/article/${article.id}`" class="btn btn-primary">Read more</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "Article",
  props: ["article"]
};
</script>
