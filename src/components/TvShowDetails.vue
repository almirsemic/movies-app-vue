<template>
  <div>
    <Header endpointType="tv">
      <h1 slot="title" v-if="tvDetails">
        {{ tvDetails.name }}({{ tvDetails.first_air_date.slice(0, 4) }})
      </h1>
      <p slot="runtime" v-if="tvDetails">
        {{
          `${(tvDetails.episode_run_time[0] / 60) ^ 0}h ` +
          (tvDetails.episode_run_time[0] % 60)
        }}min
      </p>
    </Header>
    <TopBilledCast endpointType="tv"></TopBilledCast>
    <div class="logo_and_data" v-if="tvDetails">
      <a><img src="@/assets/facebook.png" /></a>
      <a><img src="@/assets/twitter.png" /></a><br /><br />
      <p class="keyword_title">Status</p>
      <p>{{ tvDetails.status }}</p>
      <p class="keyword_title">Original Language</p>
      <p>{{ tvDetails.original_language | to-uppercase }}</p>
      <p class="keyword_title">Network</p>
      <img
        class="network_logo"
        :src="'https://themoviedb.org/t/p/original/' + network.logo_path"
        v-for="network in tvDetails.networks"
        :key="network.id"
        v-show="network.logo_path != null"
      />
      <p class="keyword_title">Type</p>
      <p>{{ tvDetails.type }}</p>
      <p class="keyword_title">Keywords</p>
      <p class="kewords" v-for="keyword in keywords" :key="keyword.id">
        {{ keyword.name }}
      </p>
      <a v-if="keywords.length == 0">No keywords have been added.</a>
    </div>
    <i>Current Season</i>
    <div class="season" v-if="tvDetails">
      <img
        :src="
          'https://themoviedb.org/t/p/original/' +
          tvDetails.seasons[0].poster_path
        "
      />
      <img
        src="@/assets/nophoto.jpg"
        v-if="tvDetails.seasons[0].poster_path == null"
      />
      <i
        @click="
          transitionToEpisodes(tvDetails.id, tvDetails.seasons[0].season_number)
        "
        >{{ tvDetails.seasons[0].name }}</i
      ><br />
      <a v-if="tvDetails.seasons[0].air_date">
        {{ tvDetails.seasons[0].air_date.slice(0, 4) }} |
        {{ tvDetails.seasons[0].episode_count }} Episodes</a
      >
      <br /><small class="premiered"
        >{{ tvDetails.seasons[0].name }} of The Walking Dead premiered on
        {{ tvDetails.seasons[0].air_date }}</small
      >
      <p>
        <small>
          {{ tvDetails.seasons[0].overview }}
        </small>
      </p>
    </div>
    <p class="view_all_seasons" @click="transitionToSeasons(tvDetails.id)">
      View All Seasons
    </p>
    <hr />
    <Reviews endpointType="tv"></Reviews>
  </div>
</template>
<script>
import Header from "../components/movieAndTvShowDetails/Header";
import TopBilledCast from "../components/movieAndTvShowDetails/TopBilledCast";
import Reviews from "../components/movieAndTvShowDetails/Reviews";

export default {
  components: {
    Header,
    TopBilledCast,
    Reviews,
  },
  data() {
    return {
      tvDetails: null,
      keywords: {},
    };
  },
  methods: {
    transitionToSeasons(id) {
      this.$router.push({ name: "seasons", params: { id } });
    },
    transitionToEpisodes(id, season_number) {
      this.$router.push({
        name: "episodes",
        params: { id, number: season_number },
      });
    },
  },
  created() {
    const ApiKey = "ffebf14b46dcd2b2bb0af17fdfffaa0c";

    fetch(
      `https://api.themoviedb.org/3/tv/${this.$route.params.id}?api_key=${ApiKey}`
    )
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        this.tvDetails = data;
      });
    fetch(
      `https://api.themoviedb.org/3/tv/${this.$route.params.id}/keywords?api_key=${ApiKey}`
    )
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        this.keywords = data.results;
      });
  },
  filters: {
    "to-uppercase"(value) {
      return value.toUpperCase();
    },
  },
};
</script>

<style scoped>
.season i {
  margin: 0 0 0 130px;
  font-weight: 700;
}
.season i:hover {
  color: silver;
}
.premiered {
  margin: 0 0 0 130px;
}
.logo_and_data img {
  margin-right: 15px;
}
.logo_and_data {
  max-width: 300px;
  display: inline-block;
  position: absolute;
  left: 1200px;
  top: 600px;
}
.keyword_title {
  font-weight: 700;
}
.network_logo {
  width: 87px;
  height: 30px;
}
.kewords {
  display: inline-block;
  border: 1px solid silver;
  height: 28px;
  margin-right: 10px;
  background: rgba(0, 0, 0, 0.1);
  border: 1px solid #d7d7d7;
  border-radius: 5px;
}

.season a {
  margin: 0 0 0 130px;
  font-weight: 700;
}
.season p {
  margin: 20px 0 0 130px;
}
.season {
  border: 1px solid silver;
  border-radius: 10px;
  padding: 25px;
  margin: 48px;
  width: 1022px;
  max-height: 275px;
  min-height: 196px;
  margin-top: 110px;
}
.season img {
  width: 130px;
  height: 194px;
  border-radius: 5px 0 0 5px;
  margin: -25px 0 0 -25px;
  position: absolute;
}
i {
  position: absolute;
  margin: 70px 0 0 60px;
  font-weight: 600;
}
.view_all_seasons {
  font-weight: 700;
  font-size: 1em;
  margin: 0 0 0 62px;
}
.view_all_seasons:hover {
  color: #beb8b8;
}
hr {
  width: 1050px;
  margin: 20px 0 0 50px;
}
</style>