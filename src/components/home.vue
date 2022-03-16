<template>
  <div class="container">
    <h5 v-if="successful">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="26"
        height="26"
        fill="currentColor"
        class="bi bi-check-all"
        viewBox="0 0 16 16"
        color="white"
      >
        <path
          d="M8.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L2.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093L8.95 4.992a.252.252 0 0 1 .02-.022zm-.92 5.14.92.92a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 1 0-1.091-1.028L9.477 9.417l-.485-.486-.943 1.179z"
        /></svg
      >Successful <br /><i>successful add !!!</i>
    </h5>
    <h5 v-if="unsuccessfully">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="26"
        height="26"
        color="white"
        fill="currentColor"
        class="bi bi-x"
        viewBox="0 0 16 16"
      >
        <path
          d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
        /></svg
      >Unsuccessfully <br /><i>please login !!!</i>
    </h5>
    <MovieAndTvShowList
      moviesEndpoint="popular"
      tvShowsEndpoint="popular"
      title="Most Popular"
    ></MovieAndTvShowList>
    <MovieAndTvShowList
      moviesEndpoint="now_playing"
      tvShowsEndpoint="airing_today"
      title="Now Playing"
    ></MovieAndTvShowList>
    <MovieAndTvShowList
      moviesEndpoint="upcoming"
      tvShowsEndpoint="on_the_air"
      title="Upcoming"
    ></MovieAndTvShowList>
    <MovieAndTvShowList
      moviesEndpoint="top_rated"
      tvShowsEndpoint="top_rated"
      title="Top Rated"
    ></MovieAndTvShowList>
  </div>
</template>
<script>
import MovieAndTvShowList from "./MovieAndTvShowList.vue";
export default {
  components: {
    MovieAndTvShowList,
  },
  data() {
    return {
      successful: false,
      unsuccessfully: false,
    };
  },
  created() {
    this.$root.$on("successful", (res) => {
      this.successful = res;
      setTimeout(() => {
        this.successful = false;
      }, 3000);
    });
    this.$root.$on("unsuccessfully", (res) => {
      this.unsuccessfully = res;
      setTimeout(() => {
        this.unsuccessfully = false;
      }, 3000);
    });
  },
};
</script>
<style scoped>
h5 {
  position: fixed;
  background-color: rgb(92, 179, 92);
  width: 240px;
  color: white;
  height: 100px;
  margin: -10px 0 0 1150px;
  text-align: center;
  padding: 20px 0;
  border-radius: 5px;
  z-index: 1;
}
</style>

