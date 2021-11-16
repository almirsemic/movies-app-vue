<template>
  <div>
    <moviesMix :moviesEndpoint="'top_rated'"></moviesMix>
  </div>
</template>

<script>
import moviesMix from "./moviesMix.vue";
export default {
  components: {
    moviesMix: moviesMix,
  },
  data() {
    return {};
  },
};
</script>

<style scoped>
</style>