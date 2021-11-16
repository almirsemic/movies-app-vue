<template>
  <div>
    <tvShowsMix :tvShowsEndpoint="'top_rated'"></tvShowsMix>
  </div>
</template>

<script>
import tvShowsMix from "./tvShowsMix.vue";
export default {
  components: {
    tvShowsMix: tvShowsMix,
  },
  data() {
    return {};
  },
};
</script>

<style scoped>
</style>