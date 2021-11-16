<template>
  <div>
    <navigationBar></navigationBar>

    <router-view></router-view>
  </div>
</template>
<script>
import navigationBar from "./components/navigationBar.vue";

export default {
  components: {
    navigationBar: navigationBar,
  },
};
</script>
<style scoped>
</style>
