<template>
  <div>
<navigationBar></navigationBar>
<home></home>
  </div>
</template>
<script>
import navigationBar from "./components/navigationBar.vue";
import home from "./components/home.vue";
export default {
  components: {
    "navigationBar": navigationBar,
    "home": home,
  }
}
</script>
<style scoped>

</style>
