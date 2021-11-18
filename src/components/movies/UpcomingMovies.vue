<template>
  <div>
    <MixMovies moviesEndpoint="upcoming"></MixMovies>
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

