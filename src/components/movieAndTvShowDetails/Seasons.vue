<template>
  <div>
    <div class="wrapper">
      <img
        v-if="tvDetails && tvDetails.poster_path"
        :src="`https://themoviedb.org/t/p/w440_and_h660_face/${this.tvDetails.poster_path}`"
      />
      <h4 v-if="tvDetails && tvDetails.name">
        {{ tvDetails.name }}({{ tvDetails.first_air_date.slice(0, 4) }})
      </h4>
      <router-link v-if="tvDetails" :to="'/tv/' + tvDetails.id"
        ><button type="button" class="btn btn-secondary">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-arrow-left"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
            />
          </svg>
          Back to main
        </button></router-link
      >
    </div>
    <div v-if="tvDetails">
      <div class="season" v-for="season in tvDetails.seasons" :key="season.id">
        <img
          v-if="season.poster_path"
          :src="'https://themoviedb.org/t/p/original/' + season.poster_path"
        />
        <img src="@/assets/nophoto.jpg" v-if="season.poster_path == null" />
        <bdi
          @click="transitionToEpisodes(tvDetails.id, season.season_number)"
          >{{ season.name }}</bdi
        ><br />
        <a v-if="season.air_date">
          {{ season.air_date.slice(0, 4) }} |
          {{ season.episode_count }} Episodes</a
        ><br />
        <small class="premiered"
          >{{ season.name }} of The Walking Dead premiered on
          {{ season.air_date }}</small
        >
        <p>
          <small>
            {{ season.overview }}
          </small>
        </p>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      tvDetails: null,
    };
  },
  methods: {
    transitionToEpisodes(id, season_number) {
      this.$router.push({
        name: "episodes",
        params: { id, number: season_number },
      });
    },
  },
  async created() {
    const ApiKey = process.env.VUE_APP_API_KEY;

    const details = await axios.get(
      `tv/${this.$route.params.id}?api_key=${ApiKey}`
    );
    this.tvDetails = details.data;
  },
};
</script>

<style scoped>
.season bdi {
  margin: 0 0 0 130px;
  font-weight: 700;
}
.season bdi:hover {
  color: silver;
}
.premiered {
  margin: 0 0 0 130px;
}
button {
  margin: -60px 0 0 220px;
}
.wrapper img {
  width: 70px;
  height: 100px;
  position: absolute;
  left: 130px;
  margin: 10px 0;
}
.wrapper {
  background-color: rgba(152, 172, 179, 0.705);
  height: 120px;
  margin: 20px 0 0 0;
  color: white;
}
h4 {
  padding: 40px;
  margin: 0 0 0 180px;
  font-weight: 700;
}
.season a {
  margin: 0 0 0 130px;
  font-weight: 700;
}
.season p {
  margin: 20px 0 0 130px;
}
.season {
  padding: 25px;
  margin: 120px;
  width: 1022px;
  max-height: 275px;
  min-height: 196px;
  margin-top: 45px;
}
.season img {
  width: 130px;
  height: 194px;
  border-radius: 5px 0 0 5px;
  margin: -25px 0 0 -25px;
  position: absolute;
}
</style>