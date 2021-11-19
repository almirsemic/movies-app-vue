<template>
  <div class="container">
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
};
</script>


