<template>
  <div>
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
    <div class="wrapper">
      <div v-for="tv in tvShows" :key="tv.id" class="imagesPosts">
        <img
          @click="movieClick(tv.id)"
          :src="
            'https://themoviedb.org/t/p/w440_and_h660_face' + tv.poster_path
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
            <p @click="addFavorite(tv.id)">
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
            <p @click="addWatchlist(tv.id)">
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
        <p @click="movieClick(tv.id)">{{ tv.name }}</p>
      </div>
    </div>
    <button>Load More</button>
  </div>
</template>
<script>
import axios from "axios";
export default {
  props: {
    tvShowsEndpoint: {
      type: String,
    },
  },
  data() {
    return {
      tvShows: [],
      successful: false,
      unsuccessfully: false,
    };
  },
  methods: {
    movieClick(tvId) {
      this.$router.push({ name: "tvShowDetails", params: { id: tvId } });
    },
    async addWatchlist(tvId) {
      if (JSON.parse(localStorage.getItem("user"))) {
        const accountId = JSON.parse(localStorage.getItem("user")).id;
        const session = JSON.parse(localStorage.getItem("session"));
        await axios.post(
          `account/${accountId}/watchlist?api_key=${process.env.VUE_APP_API_KEY}&session_id=${session.data.session_id}`,
          {
            media_type: "tv",
            media_id: tvId,
            watchlist: true,
          }
        );
        this.successful = true;
        setTimeout(() => {
          this.successful = false;
        }, 3000);
      } else {
        this.unsuccessfully = true;
        setTimeout(() => {
          this.unsuccessfully = false;
        }, 3000);
      }
    },
    async addFavorite(tvId) {
      if (JSON.parse(localStorage.getItem("user"))) {
        const accountId = JSON.parse(localStorage.getItem("user")).id;
        const session = JSON.parse(localStorage.getItem("session"));
        await axios.post(
          `account/${accountId}/favorite?api_key=${process.env.VUE_APP_API_KEY}&session_id=${session.data.session_id}`,
          {
            media_type: "tv",
            media_id: tvId,
            favorite: true,
          }
        );
        this.successful = true;
        setTimeout(() => {
          this.successful = false;
        }, 3000);
      } else {
        this.unsuccessfully = true;
        setTimeout(() => {
          this.unsuccessfully = false;
        }, 3000);
      }
    },
  },
  async created() {
    const ApiKey = process.env.VUE_APP_API_KEY;

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
  position: absolute;
  margin-left: 155px;
  margin-top: -312px;
  color: rgb(122, 113, 113);
  border-radius: 50%;
  padding: 2px 7px 5px 7px;
  background-color: #f4f4f4;
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
  height: 105px;
  width: 130px;
  margin-left: -116px;
  margin-top: 5px;
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