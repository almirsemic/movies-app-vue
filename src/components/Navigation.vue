<template>
  <div>
    <div class="nav-bar">
      <div id="logo">
        <img src="@/assets/Vector.png" width="154.82" height="18.88" />
      </div>
      <div class="left-side">
        <ul>
          <li>
            <a href="/">Movies  v</a>
            <ul>
              <li><a href="/">Popular</a></li>
              <li><a href="/">Now playing</a></li>
              <li><a href="/">Upcoming</a></li>  
              <li><a href="/">Top rated</a></li>       
            </ul>
          </li>
          <li>
            <a href="/">TV shows  v</a>
            <ul>
              <li><a href="/">Popular</a></li>      
              <li><a href="/">Now playing</a></li>
              <li><a href="/">Upcoming</a></li>
              <li><a href="/">Top rated</a></li>
            </ul>
          </li>
          <li><a href="/">People</a></li>
        </ul>
      </div>
      <div class="right-side">
        <div>
          <ul>
            <li><a href="/">Login</a></li>
            <li><a href="/">Join TMDB</a></li>
          </ul>
        </div>
        <div class="search">
          <img src="@/assets/search.png" width="21" height="20" />
        </div>
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
};
</script>
<style scoped>
* {
  padding: 0;
  margin: 0;
}
.nav-bar {
  background-color: #032541;
  height: 60px;
}
.right-side {
  text-align: right;
}
.left-side ul {
  margin: 0px;
  padding: 0px;
  list-style: none;
}
.left-side ul li {
  float: left;
  width: 100px;
  height: 40px;
  background-color: #032541;
  opacity: 0.8;
  line-height: 40px;
  text-align: center;
  font-size: 16px;
}
.left-side ul li a {
  text-decoration: none;
  color: white;
  display: block;
  font-family: Source Sans Pro;
}
.left-side ul li a:hover {
  background-color: #0088a9;
  font-family: Source Sans Pro;
}
.left-side ul li ul li {
  display: none;
}
.left-side ul li:hover ul li {
  display: block;
}
.left-side {
  margin: -50px 270px;
}
#logo {
  margin: 0px 90px;
  padding: 18px;
}
.right-side ul {
  text-align: right;
  margin: 10px 170px;
}
.right-side ul li {
  display: inline-block;
  margin-left: 30px;
  list-style: none;
}
.right-side ul li a {
  text-decoration: none;
  font-family: Source Sans Pro;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  color: silver;
}
.right-side ul li a:hover {
  color: white;
}
.search {
  margin: -42px 1390px;
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