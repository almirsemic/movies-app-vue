<template>
  <div class="Navbar">
    <div class="logo">
      <button>
        <router-link to="/"><img src="@/assets/Vector.png" /></router-link>
      </button>
    </div>
    <div class="movies">
      <button>Movies<img src="@/assets/Vector (3).png" /></button>
      <div class="one">
        <router-link to="/movie/popular">Popular</router-link>
        <router-link to="/movie/now_playing">Now Plying</router-link>
        <router-link to="/movie/upcoming">Upcoming</router-link>
        <router-link to="/movie/top_rated">Top Rated</router-link>
      </div>
    </div>
    <div class="tvshows">
      <button>Tv Shows<img src="@/assets/Vector (3).png" /></button>
      <div class="two">
        <router-link to="/tv/popular">Most Popular</router-link>
        <router-link to="/tv/airing_today">Airing Today</router-link>
        <router-link to="/tv/on_tv">On TV</router-link>
        <router-link to="/tv/top_rated">Top Rated</router-link>
      </div>
    </div>
    <div class="people">
      <button>People</button>
    </div>
    <div class="login">
      <button>Login</button>
    </div>
    <div class="join">
      <button>Join TMDB</button>
    </div>
    <div class="search">
      <button>
        <a><img src="@/assets/search.png" /></a>
      </button>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.Navbar {
  background-color: #032541;
  height: 60px;
}
.logo {
  position: absolute;
  margin: 15px 0 0 150px;
}
.logo button {
  background-color: #032541;
  color: white;
  border: #032541;
}
.movies {
  position: absolute;
  margin: 15px 0 0 350px;
}

.movies a {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}
.movies:hover .one {
  display: block;
}
.movies:hover button {
  background-color: #376992;
  border-radius: 4px;
}
.movies button {
  background-color: #032541;
  color: white;
  border: #032541;
  position: absolute;
  width: 100px;
  height: 40px;
  margin: -7px 0 0 0;
}
.movies img {
  margin-left: 10px;
}
.one {
  display: none;
  position: absolute;
  background-color: white;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
  height: 190px;
  margin: 33px 0 0 0;
  border-radius: 5px;
}
.one a:hover {
  background-color: #ddd;
  border-radius: 5px;
}
.tvshows {
  position: absolute;
  margin: 15px 0 0 450px;
}

.tvshows a {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}
.tvshows:hover .two {
  display: block;
}
.tvshows:hover button {
  background-color: #376992;
  border-radius: 4px;
}

.tvshows button {
  background-color: #032541;
  color: white;
  border: #032541;
  position: absolute;
  width: 110px;
  height: 40px;
  margin: -7px 0 0 0;
}
.tvshows img {
  margin-left: 5px;
}
.two {
  display: none;
  position: absolute;
  background-color: white;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
  height: 190px;
  margin: 33px 0 0 0;
  border-radius: 5px;
}
.two a:hover {
  background-color: #ddd;
  border-radius: 5px;
}
.people {
  position: absolute;
  margin: 15px 0 0 560px;
}

.people button {
  background-color: #032541;
  color: white;
  border: #032541;
  position: absolute;
  width: 75px;
  height: 40px;
  margin: -7px 0 0 0;
}
.people:hover button {
  background-color: #376992;
  border-radius: 4px;
}
.login {
  position: absolute;
  margin: 15px 0 0 1200px;
}

.login:hover button {
  background-color: #376992;
  border-radius: 4px;
}
.login button {
  background-color: #032541;
  color: white;
  border: #032541;
  position: absolute;
  width: 75px;
  height: 40px;
  margin: -7px 0 0 0;
}
.join {
  position: absolute;
  margin: 15px 0 0 1280px;
}

.join:hover button {
  background-color: #376992;
  border-radius: 4px;
}
.join button {
  background-color: #032541;
  color: white;
  border: #032541;
  position: absolute;
  width: 110px;
  height: 40px;
  margin: -7px 0 0 0;
}
.search {
  position: absolute;
  margin: 15px 0 0 1400px;
}

.search button {
  background-color: #032541;
  color: white;
  border: #032541;
  position: absolute;
  border-radius: 180%;
  padding: 5px 7px 7px 7px;
  top: -7px;
}
.search:hover button {
  background-color: white;
}
</style>