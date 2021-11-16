<template>
  <div>
    <moviesMix :moviesEndpoint="'upcoming'"></moviesMix>
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