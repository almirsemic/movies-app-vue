<template>
  <div>
    <h3>{{ this.title }}</h3>
    <div
      class="button"
      :class="{
        available: showMovies,
        notAvailable: !showMovies,
      }"
    >
      <button @click="showMovies = true" class="movies">Movies</button>
      <button @click="showMovies = false" class="tvShows">Tv Shows</button>
    </div>
    <div class="wrapper" v-show="showMovies">
      <div v-for="movie in movies" :key="movie.id" class="old">
        <img
          :src="
            'https://themoviedb.org/t/p/w440_and_h660_face' + movie.poster_path
          "
        />
        <p>{{ movie.title }}</p>
      </div>
    </div>
    <div class="wrapper" v-show="!showMovies">
      <div v-for="one in tvShows" :key="one.id" class="old">
        <img
          :src="
            'https://themoviedb.org/t/p/w440_and_h660_face' + one.poster_path
          "
        />
        <p>{{ one.name }}</p>
      </div>
    </div>
    <hr />
    
  </div>
</template>

<script>
export default {
  props: {
    moviesEndpoint: {
      type: String,
    },
    tvShowsEndpoint: {
      type: String,
    },
    title: {
      type: String,
    },
   
  },
  data() {
    return {
      movies: [],
      tvShows: [],
      showMovies: true,
    };
  },
  created() {
    fetch(
      `https://api.themoviedb.org/3/movie/${this.moviesEndpoint}?api_key=ffebf14b46dcd2b2bb0af17fdfffaa0c`
    )
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        this.movies = data.results;
      });
    fetch(
      `https://api.themoviedb.org/3/tv/${this.tvShowsEndpoint}?api_key=ffebf14b46dcd2b2bb0af17fdfffaa0c`
    )
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        this.tvShows = data.results;
      })
      
  },
};
</script>

<style scoped>
.wrapper {
  height: 480px;
  margin: 17px 0 -17px 0;
  display: flex;
  overflow-x: auto;
  padding: 41px;
  background-color: #f8f0fb;
}

.wrapper img {
  width: 150px;
  height: 225px;
  display: inline-block;
  padding: 10px;
  border-radius: 20px;
}

.wrapper p {
  text-align: center;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 20px;
}

h3 {
  display: inline-block;
  margin: 70px 0 0 0;
}
.old {
  background-color: white;
  border-radius: 10px;
  height: 330px;
  width: 152px;
  margin: 25px 5px;
  border: 1px solid #ccc;
}

.old:hover {
  margin-top: -30px;
  margin-left: 30px;
  margin-right: 30px;
  max-height: 400px;
  width: 170px;
}
.old:hover img {
  width: 170px;
  height: 255px;
}

hr {
  padding: 2px;
}
.button {
  height: 30px;
  margin: -30px 0 0 270px;
}
button {
  border: 1px solid #032541;
  border-radius: 30px;
  width: 150px;
  background-color: white;
  margin-left: 7px;
}
.available .movies {
  background-color: #032541;
  color: white;
}
.notAvailable .tvShows {
  background-color: #032541;
  color: white;
}
</style>