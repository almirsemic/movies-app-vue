
<template>
  <div>
    <div class="pre-header">
      <div class="logo">
        <router-link to="/" exact
          ><img src="@/assets/Vector.png" width="154.82" height="18.88"
        /></router-link>
      </div>
      <div class="first-menu">
        <ul>
          <li><a href="/">Movies</a></li>
          <li><a href="#">TV shows</a></li>
          <router-link to="/people" exact
            ><li><a href="#">People</a></li></router-link
          >
        </ul>
      </div>
      <div class="second-menu">
        <ul>
          <li><a href="#">Login</a></li>
          <li><a href="#">Join TMDB</a></li>
        </ul>
      </div>
      <div class="search">
        <img src="@/assets/search.png" width="21" height="20" />
      </div>
    </div>
    <div class="third-menu">
      <ul>
        <router-link to="/overview" exact
          ><li><a href="#">Overview</a></li></router-link
        >
        <router-link to="/casts" exact
          ><li><a href="#">Casts</a></li></router-link
        >
        <router-link to="/reviews" exact
          ><li><a href="#">Reviews</a></li></router-link
        >
        <router-link to="/seasions" exact
          ><li><a href="#">Seasions</a></li></router-link
        >
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {},
  computed: {},
};
</script>
<style scoped>
* {
  margin: 0;
  padding: 0;
}
.pre-header {
  height: 60.34px;
  background-color: #032541;
}
.logo {
  margin-left: 150px;
  padding: 15px;
}
.first-menu ul {
  margin: -38px 330px;
}
.first-menu ul li {
  display: inline-block;
  margin-left: 20px;
  list-style: none;
}
.first-menu ul li a {
  text-decoration: none;
  font-family: Source Sans Pro;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  color: #fff;
}

.first-menu ul li a:hover {
  color: #0088a9;
}
.second-menu ul {
  text-align: right;
  margin: 15px 170px;
}
.second-menu ul li {
  display: inline-block;
  margin-left: 30px;
  list-style: none;
}
.second-menu ul li a {
  text-decoration: none;
  font-family: Source Sans Pro;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  color: #fff;
}
.second-menu ul li a:hover {
  color: #0088a9;
}
.search {
  margin: -45px 1390px;
}
.search:hover {
  font-size: 10px;
}
.third-menu {
  background-color: #fff;
  height: 45px;
}
.third-menu ul {
  margin: 10px 30px;
  margin: 13px 465px;
}
.third-menu ul li {
  display: inline-block;
  margin-left: 65px;
  list-style: none;
}
.third-menu ul li a {
  text-decoration: none;
  font-family: Source Sans Pro;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  color: #000000;
}
.third-menu a:hover {
  color: silver;
}
</style>