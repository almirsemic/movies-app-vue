<template>
  <div>
    <tvShowsMix :tvShowsEndpoint="'popular'"></tvShowsMix>
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