<template>
  <div>
    <div class="account">
      <div class="data">
        <p>{{ user.username.slice(0, 1).toUpperCase() }}</p>
        <strong>{{ user.username }}</strong>
        <div class="averge">
          <label>0%</label>
          <small
            >Average <br />
            Movie Score</small
          >
          <label>0%</label>
          <small
            >Average <br />
            TV Score</small
          >
        </div>
      </div>
    </div>
    <div class="watchlist_ratings_favorites">
      <div class="favorites">
        <strong
          >Favorites
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-caret-down-fill"
            viewBox="0 0 16 16"
          >
            <path
              d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"
            /></svg
        ></strong>
        <div class="movei_and_tvShows">
          <a @click="(watchlist = true), (type = false)">Movie <br /></a>
          <a @click="(watchlist = false), (type = false)">TV Shows</a>
        </div>
      </div>
      <div class="ratings">
        <strong
          >Ratings
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-caret-down-fill"
            viewBox="0 0 16 16"
          >
            <path
              d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"
            /></svg
        ></strong>
        <div class="movei_and_tvShows">
          <a>Movie <br /></a>
          <a>TV Shows</a>
        </div>
      </div>
      <div class="watchlists">
        <strong
          >Watchlist
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-caret-down-fill"
            viewBox="0 0 16 16"
          >
            <path
              d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"
            /></svg
        ></strong>
        <div class="movei_and_tvShows">
          <a @click="(watchlist = true), (type = true)">Movie <br /></a>
          <a @click="(watchlist = false), (type = true)">TV Shows</a>
        </div>
      </div>
    </div>
    <MovieTvWatchlist
      :watchlist="watchlist"
      :endpointType="'watchlist'"
      v-if="type"
    ></MovieTvWatchlist>
    <MovieTvFavorite
      :watchlist="watchlist"
      :endpointType="'favorite'"
      v-if="!type"
    ></MovieTvFavorite>
  </div>
</template>
<script>
import MovieTvWatchlist from "../Account/MovieTvWatchlist.vue";
import MovieTvFavorite from "../Account/MovieTvFavorite.vue";
import { mapGetters } from "vuex";
import axios from "axios";
export default {
  components: {
    MovieTvWatchlist,
    MovieTvFavorite,
  },
  data() {
    return {
      watchlist: true,
      type: true,
    };
  },
  computed: {
    ...mapGetters(["user"]),
  },
  async created() {
    this.$root.$on("watchlist", (res) => {
      this.watchlist = res;
    });
    const session = JSON.parse(localStorage.getItem("session"));
    const account = await axios.get(
      `account?api_key=ffebf14b46dcd2b2bb0af17fdfffaa0c&session_id=${session.data.session_id}`
    );
    localStorage.setItem("user", JSON.stringify(account.data));
  },
};
</script>

<style scoped>
.account {
  height: 350px;
  background-color: #063358;
}
.data p {
  width: 150px;
  height: 150px;
  background-color: #1e4d74;
  text-align: center;
  font-weight: 600;
  font-size: 35px;
  padding: 45px;
  border-radius: 50%;
  border: 3px solid #032541;
  color: white;
}
.data {
  margin: 100px 0 0 150px;
  position: absolute;
  display: inline-flex;
}
.data strong {
  margin: 10px 0 0 30px;
  font-size: 25px;
  color: white;
  font-weight: 400;
}
.averge {
  display: inline-flex;
  margin: 70px 0 0 -165px;
}
.averge small {
  margin-left: 20px;
  padding: 10px;
  color: white;
}
.averge label {
  margin-left: 45px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #1e4d74;
  padding: 14px 0 0 20px;
  border: 2px solid white;
  font-weight: 600;
  color: white;
}
.movei_and_tvShows {
  display: none;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
  width: 95px;
  height: 55px;
  margin: 2px 3px;
  background-color: white;
}
.movei_and_tvShows a {
  color: black;
  padding: 2px 4px;
  display: block;
}
.movei_and_tvShows a:hover {
  background-color: #ccc;
}
.ratings:hover .movei_and_tvShows {
  display: block;
}
.watchlists:hover .movei_and_tvShows {
  display: block;
}
.favorites:hover .movei_and_tvShows {
  display: block;
}
.watchlists {
  position: absolute;
  margin: 0 0 0 850px;
}
.watchlists strong {
  border-radius: 8px;
  padding: 4px;
}
.watchlists:hover strong {
  background-color: #ccc;
  color: white;
}
.ratings {
  position: absolute;
  margin: 0 0 0 690px;
}
.ratings strong {
  border-radius: 8px;
  padding: 4px;
}
.ratings:hover strong {
  background-color: #ccc;
  color: white;
}
.favorites {
  position: absolute;
  margin: 0 0 0 510px;
}
.favorites strong {
  border-radius: 8px;
  padding: 4px;
}
.favorites:hover strong {
  background-color: #ccc;
  color: white;
}
.watchlist_ratings_favorites {
  display: inline-flex;
}
</style>