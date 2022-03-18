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
      <div v-for="movie in movies" :key="movie.id" class="imagesPosts">
        <img
          @click="movieClick(movie.id)"
          :src="
            'https://themoviedb.org/t/p/w440_and_h660_face' + movie.poster_path
          "
        />
        <div class="view_more">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-chat-dots"
            viewBox="0 0 16 16"
          >
            <path
              d="M5 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"
            />
            <path
              d="m2.165 15.803.02-.004c1.83-.363 2.948-.842 3.468-1.105A9.06 9.06 0 0 0 8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6a10.437 10.437 0 0 1-.524 2.318l-.003.011a10.722 10.722 0 0 1-.244.637c-.079.186.074.394.273.362a21.673 21.673 0 0 0 .693-.125zm.8-3.108a1 1 0 0 0-.287-.801C1.618 10.83 1 9.468 1 8c0-3.192 3.004-6 7-6s7 2.808 7 6c0 3.193-3.004 6-7 6a8.06 8.06 0 0 1-2.088-.272 1 1 0 0 0-.711.074c-.387.196-1.24.57-2.634.893a10.97 10.97 0 0 0 .398-2z"
            />
          </svg>
          <div class="more">
            <strong
              ><svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-menu-up"
                viewBox="0 0 16 16"
              >
                <path
                  d="M7.646 15.854a.5.5 0 0 0 .708 0L10.207 14H14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2H2a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h3.793l1.853 1.854zM1 9V6h14v3H1zm14 1v2a1 1 0 0 1-1 1h-3.793a1 1 0 0 0-.707.293l-1.5 1.5-1.5-1.5A1 1 0 0 0 5.793 13H2a1 1 0 0 1-1-1v-2h14zm0-5H1V3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v2zM2 11.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 0-1h-8a.5.5 0 0 0-.5.5zm0-4a.5.5 0 0 0 .5.5h11a.5.5 0 0 0 0-1h-11a.5.5 0 0 0-.5.5zm0-4a.5.5 0 0 0 .5.5h6a.5.5 0 0 0 0-1h-6a.5.5 0 0 0-.5.5z"
                /></svg
              >&nbsp;&nbsp;Add to List</strong
            >
            <p @click="addFavorite(movie.id, 'movie')">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-heart-fill"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
                /></svg
              >&nbsp;&nbsp;Favorite&nbsp;&nbsp;
            </p>
            <p @click="addWatchlist(movie.id, 'movie')">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-bookmark-fill"
                viewBox="0 0 16 16"
              >
                <path
                  d="M2 2v13.5a.5.5 0 0 0 .74.439L8 13.069l5.26 2.87A.5.5 0 0 0 14 15.5V2a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2z"
                /></svg
              >&nbsp;&nbsp;Watchlist
            </p>
          </div>
        </div>
        <small @click="movieClick(movie.id)">{{ movie.title }}</small>
      </div>
    </div>
    <div class="wrapper" v-show="!showMovies">
      <div v-for="one in tvShows" :key="one.id" class="imagesPosts">
        <img
          @click="tvShowClick(one.id)"
          :src="
            'https://themoviedb.org/t/p/w440_and_h660_face' + one.poster_path
          "
        />
        <div class="view_more">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-chat-dots"
            viewBox="0 0 16 16"
          >
            <path
              d="M5 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"
            />
            <path
              d="m2.165 15.803.02-.004c1.83-.363 2.948-.842 3.468-1.105A9.06 9.06 0 0 0 8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6a10.437 10.437 0 0 1-.524 2.318l-.003.011a10.722 10.722 0 0 1-.244.637c-.079.186.074.394.273.362a21.673 21.673 0 0 0 .693-.125zm.8-3.108a1 1 0 0 0-.287-.801C1.618 10.83 1 9.468 1 8c0-3.192 3.004-6 7-6s7 2.808 7 6c0 3.193-3.004 6-7 6a8.06 8.06 0 0 1-2.088-.272 1 1 0 0 0-.711.074c-.387.196-1.24.57-2.634.893a10.97 10.97 0 0 0 .398-2z"
            />
          </svg>
          <div class="more">
            <strong
              ><svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-menu-up"
                viewBox="0 0 16 16"
              >
                <path
                  d="M7.646 15.854a.5.5 0 0 0 .708 0L10.207 14H14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2H2a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h3.793l1.853 1.854zM1 9V6h14v3H1zm14 1v2a1 1 0 0 1-1 1h-3.793a1 1 0 0 0-.707.293l-1.5 1.5-1.5-1.5A1 1 0 0 0 5.793 13H2a1 1 0 0 1-1-1v-2h14zm0-5H1V3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v2zM2 11.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 0-1h-8a.5.5 0 0 0-.5.5zm0-4a.5.5 0 0 0 .5.5h11a.5.5 0 0 0 0-1h-11a.5.5 0 0 0-.5.5zm0-4a.5.5 0 0 0 .5.5h6a.5.5 0 0 0 0-1h-6a.5.5 0 0 0-.5.5z"
                /></svg
              >&nbsp;&nbsp;Add to List</strong
            >
            <p @click="addFavorite(one.id, 'tv')">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-heart-fill"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
                /></svg
              >&nbsp;&nbsp;Favorite&nbsp;&nbsp;
            </p>
            <p @click="addWatchlist(one.id, 'tv')">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-bookmark-fill"
                viewBox="0 0 16 16"
              >
                <path
                  d="M2 2v13.5a.5.5 0 0 0 .74.439L8 13.069l5.26 2.87A.5.5 0 0 0 14 15.5V2a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2z"
                /></svg
              >&nbsp;&nbsp;Watchlist
            </p>
          </div>
        </div>
        <small @click="tvShowClick(one.id)">{{ one.name }}</small>
      </div>
    </div>
    <hr />
  </div>
</template>

<script>
import axios from "axios";
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
      successful: false,
      unsuccessfully: false,
    };
  },
  methods: {
    movieClick(movieId) {
      this.$router.push({ name: "movieDetails", params: { id: movieId } });
    },
    tvShowClick(tvId) {
      this.$router.push({ name: "tvShowDetails", params: { id: tvId } });
    },
    async addWatchlist(typeId, type) {
      if (JSON.parse(localStorage.getItem("user"))) {
        const accountId = JSON.parse(localStorage.getItem("user")).id;
        const session = JSON.parse(localStorage.getItem("session"));
        await axios.post(
          `account/${accountId}/watchlist?api_key=${process.env.VUE_APP_API_KEY}&session_id=${session.data.session_id}`,
          {
            media_type: type,
            media_id: typeId,
            watchlist: true,
          }
        );
        this.$root.$emit("successful", true);
      } else {
        this.$root.$emit("unsuccessfully", true);
      }
    },
    async addFavorite(typeId, type) {
      if (JSON.parse(localStorage.getItem("user"))) {
        const accountId = JSON.parse(localStorage.getItem("user")).id;
        const session = JSON.parse(localStorage.getItem("session"));
        await axios.post(
          `account/${accountId}/favorite?api_key=${process.env.VUE_APP_API_KEY}&session_id=${session.data.session_id}`,
          {
            media_type: type,
            media_id: typeId,
            favorite: true,
          }
        );
        this.$root.$emit("successful", true);
      } else {
        this.$root.$emit("unsuccessfully", true);
      }
    },
  },
  async created() {
    const ApiKey = process.env.VUE_APP_API_KEY;

    const allMovies = await axios.get(
      `movie/${this.moviesEndpoint}?api_key=${ApiKey}`
    );
    this.movies = allMovies.data.results;
    const allTvShows = await axios.get(
      `tv/${this.tvShowsEndpoint}?api_key=${ApiKey}`
    );
    this.tvShows = allTvShows.data.results;
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
  margin: -130px 0 0 1250px;
  text-align: center;
  padding: 20px 0;
  border-radius: 5px;
  z-index: 1;
}
.view_more {
  position: relative;
  margin-left: 105px;
  right: 13px;
  margin-top: -212px;
  color: rgb(122, 113, 113);
  border-radius: 50%;
  padding: 0 0 30px 0;
  background-color: #f4f4f4;
  max-height: 25px;
}
.view_more:hover .more {
  display: block;
}
.view_more:hover {
  color: #01b4e4;
  border: none;
  background-color: transparent;
}
.more {
  background-color: white;
  color: black;
  height: 114px;
  width: 130px;
  margin-left: -99px;
  margin-top: 6px;
  display: none;
  z-index: 1;
}
.more p:hover {
  background-color: silver;
  color: white;
}
.more p {
  padding: 10px;
  margin: 1px 0;
}
.more strong {
  margin: 0 10px;
}
.wrapper {
  height: 480px;
  margin: 17px 0 -17px 0;
  display: flex;
  overflow-x: auto;
  padding: 41px;
  background-color: #f8f0fb;
  text-align: center;
}
.wrapper img {
  width: 150px;
  height: 225px;
  display: inline-block;
  padding: 10px;
  border-radius: 20px;
}
.wrapper small {
  position: relative;
  top: 180px;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 20px;
}
.imagesPosts:hover small {
  top: 210px;
}
h3 {
  display: inline-block;
  margin: 70px 0 0 0;
}
.imagesPosts {
  background-color: white;
  border-radius: 10px;
  height: 330px;
  width: 152px;
  margin: 25px 5px;
  border: 1px solid #ccc;
}
.imagesPosts:hover .view_more {
  margin-top: -240px;
  margin-left: 125px;
}
.imagesPosts:hover {
  margin-top: -30px;
  margin-left: 30px;
  margin-right: 30px;
  max-height: 400px;
  width: 170px;
}
.imagesPosts:hover img {
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