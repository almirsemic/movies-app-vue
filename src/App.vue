<template>
  <div>
    <!--
<drop-app></drop-app>
<picture-app></picture-app>
--> 
<navigation-app></navigation-app>
<router-view></router-view>
  </div>
</template>
<script>


import Navigation from "./components/Navigation.vue"
/*
import picture from "./components/picture.vue" 
import drop from "./components/drop.vue"*/

export default {
  components: {
    "navigation-app": Navigation,
/*
"drop-app": drop,
"picture-app": picture, */
  },
  data(){
    return {

    }
  },
  methods:{

  },
  computed:{

  }
}
</script>
<style scoped>

</style>
