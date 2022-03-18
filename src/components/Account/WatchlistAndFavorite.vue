<template>
  <div>
    <div class="container">
      <div class="watchlist">
        <div class="left_menu">
          <h2>My {{ type }}</h2>
          <span v-if="movieWatchlist" @click="movie()"
            >Movie {{ movieWatchlist.length }}
            <hr v-if="watchlist"
          /></span>
          <span v-if="tvWatchlist" @click="tv()"
            >TV {{ tvWatchlist.length }}
            <hr v-if="!watchlist"
          /></span>
        </div>
        <div class="right_menu">
          <p>Filter by:</p>
          <select class="filters" @change="sortBySelect()" v-model="select">
            <option>Date Added</option>
            <option>Release Date</option>
            <option>Name</option>
            <option>Popularity</option>
          </select>
          <p @click="reverseOrder(), (arrow = !arrow)">
            Order:
            <svg
              v-if="arrow"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-arrow-down"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z"
              />
            </svg>
            <svg
              v-if="!arrow"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-arrow-up"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5z"
              />
            </svg>
          </p>
          <a
            ><svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-search"
              viewBox="0 0 16 16"
            >
              <path
                d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"
              /></svg
          ></a>
          <input type="search" class="form-control" v-model="search" />
        </div>
        <Watchlist
          :dataWatchlist="filteredMovie"
          :type="type"
          v-if="watchlist && movieWatchlist"
        ></Watchlist>
        <Watchlist
          :dataWatchlist="filteredTvShows"
          :type="type"
          v-if="!watchlist && tvWatchlist"
        ></Watchlist>
      </div>
    </div>
  </div>
</template>
<script>
import Watchlist from "./Watchlist.vue";
import axios from "axios";
export default {
  props: ["watchlist", "endpointType", "type"],
  components: {
    Watchlist,
  },
  data() {
    return {
      movieWatchlist: null,
      tvWatchlist: null,
      arrow: true,
      search: "",
      select: "Date Added",
    };
  },
  methods: {
    movie() {
      this.$root.$emit("watchlist", true);
    },
    tv() {
      this.$root.$emit("watchlist", false);
    },
    reverseOrder() {
      if (this.watchlist) {
        this.movieWatchlist.reverse();
      } else if (!this.watchlist) {
        this.tvWatchlist.reverse();
      }
    },
    sortBySelect() {
      if (this.watchlist && this.select == "Date Added") {
        this.movieWatchlist.sort((a, b) => {
          return a.counter > b.counter ? 1 : a.counter < b.counter ? -1 : 0;
        });
      } else if (!this.watchlist && this.select == "Date Added") {
        this.tvWatchlist.sort((a, b) => {
          return a.counter > b.counter ? 1 : a.counter < b.counter ? -1 : 0;
        });
      }
      if (this.watchlist && this.select == "Release Date") {
        this.movieWatchlist.sort((a, b) => {
          return (
            (new Date(b.release_date).getTime() || +Infinity) -
            (new Date(a.release_date).getTime() || +Infinity)
          );
        });
      } else if (!this.watchlist && this.select == "Release Date") {
        this.tvWatchlist.sort((a, b) => {
          return (
            (new Date(b.first_air_date).getTime() || +Infinity) -
            (new Date(a.first_air_date).getTime() || +Infinity)
          );
        });
      } else if (this.watchlist && this.select == "Popularity") {
        this.movieWatchlist.sort((a, b) => {
          return a.popularity > b.popularity
            ? 1
            : a.popularity < b.popularity
            ? -1
            : 0;
        });
      } else if (!this.watchlist && this.select == "Popularity") {
        this.tvWatchlist.sort((a, b) => {
          return a.popularity > b.popularity
            ? 1
            : a.popularity < b.popularity
            ? -1
            : 0;
        });
      } else if (this.watchlist && this.select == "Name") {
        this.movieWatchlist.sort((a, b) => {
          return a.original_title > b.original_title
            ? 1
            : a.original_title < b.original_title
            ? -1
            : 0;
        });
      } else if (!this.watchlist && this.select == "Name") {
        this.tvWatchlist.sort((a, b) => {
          return a.name > b.name ? 1 : a.name < b.name ? -1 : 0;
        });
      }
    },
  },
  async created() {
    const sessionResponse = JSON.parse(localStorage.getItem("session"));
    const account = JSON.parse(localStorage.getItem("user"));
    const moviesWatchlistResponse = await axios.get(
      `account/${account.id}/${this.endpointType}/movies?api_key=${process.env.VUE_APP_API_KEY}&session_id=${sessionResponse.data.session_id}`
    );
    this.movieWatchlist = moviesWatchlistResponse.data.results;
    const tvWatchlistResponse = await axios.get(
      `account/${account.id}/${this.endpointType}/tv?api_key=${process.env.VUE_APP_API_KEY}&session_id=${sessionResponse.data.session_id}`
    );
    this.tvWatchlist = tvWatchlistResponse.data.results;
    for (let i = 0; i < this.movieWatchlist.length; i++) {
      Object.assign(this.movieWatchlist[i], { counter: i });
    }
    for (let i = 0; i < this.tvWatchlist.length; i++) {
      Object.assign(this.tvWatchlist[i], { counter: i });
    }
  },
  computed: {
    filteredMovie() {
      return this.movieWatchlist.filter((movie) => {
        return movie.original_title.match(this.search);
      });
    },
    filteredTvShows() {
      return this.tvWatchlist.filter((tvshow) => {
        return tvshow.name.match(this.search);
      });
    },
  },
};
</script>
<style scopde>
.filters {
  height: 30px;
  margin-right: 15px;
  border: none;
  margin-top: -2px;
}
.watchlist {
  margin: 60px 0;
}
.left_menu hr {
  height: 5px;
  color: rgb(199, 28, 62);
}
.form-control {
  max-height: 30px;
  margin-left: 10px;
}
.card {
  margin: 10px 0;
  height: 200px;
  width: 1300px;
  box-shadow: rgb(0 0 0 / 10%) -8px 0px 10px -5px;
}
.left_menu h2 {
  font-weight: 700;
  font-size: 1.5em;
}
.right_menu {
  float: right;
  display: inline-flex;
}
.right_menu p {
  margin-right: 10px;
  min-width: 70px;
}
.right_menu a {
  margin: 0 0 0 10px;
}
.left_menu {
  float: left;
  display: inline-flex;
}
.left_menu span {
  margin-left: 15px;
  padding: 5px 0;
}
</style>