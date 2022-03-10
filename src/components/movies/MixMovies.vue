<template>
  <div>
    <div class="wrapper">
      <div
        v-for="movie in movies"
        :key="movie.id"
        class="imagesPosts"
        @click="movieClick(movie.id)"
      >
        <img
          :src="
            'https://themoviedb.org/t/p/w440_and_h660_face' + movie.poster_path
          "
        />
        <p>{{ movie.title }}</p>
      </div>
    </div>
    <button>Load More</button>
  </div>
</template>
<script>
import axios from "axios";
export default {
  props: {
    moviesEndpoint: {
      type: String,
    },
  },
  data() {
    return {
      movies: [],
    };
  },
  methods: {
    movieClick(movieId) {
      this.$router.push({ name: "movieDetails", params: { id: movieId } });
    },
  },
  async created() {
    const ApiKey = "ffebf14b46dcd2b2bb0af17fdfffaa0c";
    
    const allMovies = await axios.get(
      `movie/${this.moviesEndpoint}?api_key=${ApiKey}`
    );
    this.movies = allMovies.data.results;
  },
};
</script>

<style scoped>
.wrapper {
  margin: 100px 50px 0 330px;
  display: table;
  background-color: #f8f0fb;
}

.wrapper img {
  width: 200px;
  height: 325px;

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
.imagesPosts {
  background-color: white;
  border-radius: 10px;
  height: 430px;
  width: 200px;
  border: 1px solid #ccc;
  display: block;
  float: right;
  margin: 20px 10px;
}
.imagesPosts:hover {
  background-color: #f8f0fb;
  border: 1px solid #f8f0fb;
}

button {
  width: 1080px;
  margin: 0 0 7px 360px;
  text-align: center;
  border-radius: 10px;
  border: 1px solid #01b4e4;
  background-color: #01b4e4;
  color: white;
  font-size: 20px;
}
</style>