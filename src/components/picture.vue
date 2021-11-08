<template>
  <div class="picture">
    <div id="venom">
      <img src="@/assets/Rectangle (1).png" width="301.6" height="450" />
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
};
</script>
<style scoped>
.picture {
  background-image: url("../assets/Rectangle.png");
  height: 511px;
}

#venom {
  position: absolute;
  left: 92.49px;
  top: 150px;
}
#venom:hover {
  margin-top: -20px;
}


</style>