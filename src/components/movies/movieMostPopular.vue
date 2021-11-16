
<template>
  <div>
    <moviesMix :moviesEndpoint="'popular'"></moviesMix>
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




