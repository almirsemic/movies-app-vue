<template>
  <div>
    <MixMovies moviesEndpoint="top_rated"></MixMovies>
  </div>
</template>

<script>
import MixMovies from "./MixMovies.vue";
export default {
  components: {
    MixMovies,
  },
};
</script>

