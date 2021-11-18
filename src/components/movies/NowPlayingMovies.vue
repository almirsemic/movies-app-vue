<template>
  <div>
    <MixMovies moviesEndpoint="now_playing"></MixMovies>
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

