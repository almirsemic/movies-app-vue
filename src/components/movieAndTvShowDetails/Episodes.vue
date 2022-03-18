<template>
  <div>
    <div class="wrapper">
      <img
        v-if="
          EpisodesDetails && EpisodesDetails.seasons[SeriesNumber].poster_path
        "
        :src="`https://themoviedb.org/t/p/w440_and_h660_face/${this.EpisodesDetails.seasons[SeriesNumber].poster_path}`"
      />
      <img
        v-if="
          EpisodesDetails && !EpisodesDetails.seasons[SeriesNumber].poster_path
        "
        src="@/assets/nophoto.jpg"
      />
      <h4 v-if="EpisodesDetails && EpisodesDetails.seasons[SeriesNumber].name">
        {{ EpisodesDetails.seasons[SeriesNumber].name }}
      </h4>
      <h3
        v-if="EpisodesDetails && EpisodesDetails.seasons[SeriesNumber].air_date"
      >
        ({{ EpisodesDetails.seasons[SeriesNumber].air_date.slice(0, 4) }})
      </h3>
      <h3
        v-if="
          EpisodesDetails && !EpisodesDetails.seasons[SeriesNumber].air_date
        "
      >
        ({{ EpisodesDetails.first_air_date.slice(0, 4) }})
      </h3>
      <router-link v-if="EpisodesDetails" :to="'/tv/' + EpisodesDetails.id"
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
    <div>
      <br />
      <hr />
      <h5 v-if="Episodes">Episodes {{ Episodes.length }}</h5>
      <div class="episode" v-for="episode in Episodes" :key="episode.id">
        <img
          v-if="episode.still_path"
          :src="'https://themoviedb.org/t/p/original/' + episode.still_path"
        />
        <img v-if="!episode.still_path" src="@/assets/nophoto.jpg" />
        <hr />
        <strong>{{ episode.episode_number }} {{ episode.name }}</strong>
        <p class="detailss">{{ episode.air_date }}</p>
        <small class="details">{{ episode.overview | details }}</small>
        <button @click="OpenMore = episode.id" v-if="OpenMore != episode.id">
          <svg
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
            /></svg
          >Expand
        </button>
        <div class="row" v-if="OpenMore && OpenMore == episode.id">
          <div class="col-md-2">
            <div class="first_col">
              <p>Crew {{ episode.crew.length }}</p>
              <p>Guest Stars {{ episode.guest_stars.length }}</p>
              <p v-if="episode.guest_stars.length < 1">
                No guest stars have been added.
              </p>

              <p
                v-if="
                  episode &&
                  episode.crew.length > 0 &&
                  episode.crew[0].job == 'Director'
                "
              >
                Directed by: <small>{{ episode.crew[0].name }}</small>
              </p>
              <p
                v-if="
                  episode &&
                  episode.crew.length > 0 &&
                  episode.crew[0].known_for_department == 'Writing'
                "
              >
                Written by: <small>{{ episode.crew[0].original_name }}</small>
              </p>
              <p
                v-if="
                  (episode && episode.crew.length == 0) ||
                  episode.crew[0].job != 'Director'
                "
              >
                Direction by: <small>No director has been added.</small>
              </p>
              <p
                v-if="
                  (episode && episode.crew.length == 0) ||
                  episode.crew[0].known_for_department != 'Writing'
                "
              >
                Written by: <small>No writer has been added.</small>
              </p>
            </div>
          </div>
          <div class="col-md-5">
            <div
              class="second_col"
              v-for="a in episode.guest_stars.slice(
                0,
                Math.ceil(episode.guest_stars.length / 2)
              )"
              :key="a.credit_id"
            >
              <img
                @click="transitionToActorDetails(a.id)"
                v-if="a.profile_path"
                :src="'https://themoviedb.org/t/p/original/' + a.profile_path"
              />
              <img
                @click="transitionToActorDetails(a.id)"
                src="@/assets/image.png"
                v-if="a.profile_path == null"
              />
              <bdi @click="transitionToActorDetails(a.id)"
                >{{ a.name }} <br /><i>{{ a.character }}</i></bdi
              >
            </div>
          </div>
          <div class="col-md-5">
            <div
              class="third_col"
              v-for="a in episode.guest_stars.slice(
                Math.ceil(episode.guest_stars.length / 2),
                episode.guest_stars.length
              )"
              :key="a.credit_id"
            >
              <img
                @click="transitionToActorDetails(a.id)"
                v-if="a.profile_path"
                :src="'https://themoviedb.org/t/p/original/' + a.profile_path"
              />
              <img
                @click="transitionToActorDetails(a.id)"
                src="@/assets/image.png"
                v-if="a.profile_path == null"
              />
              <bdi @click="transitionToActorDetails(a.id)"
                >{{ a.name }} <br /><i>{{ a.character }}</i></bdi
              >
            </div>
          </div>
          <button @click="OpenMore = null">
            <svg
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
              /></svg
            >Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      Episodes: null,
      EpisodesDetails: null,
      OpenMore: null,
      SeriesNumber: null,
    };
  },
  methods: {
    transitionToActorDetails(id) {
      this.$router.push({ name: "actorDetails", params: { id } });
    },
  },
  async created() {
    const ApiKey = process.env.VUE_APP_API_KEY;
    const season = await axios.get(
      `tv/${this.$route.params.id}/season/${this.$route.params.number}?api_key=${ApiKey}`
    );
    this.Episodes = season.data.episodes;
    const seasonEpisodeDetails = await axios.get(
      `tv/${this.$route.params.id}?api_key=${ApiKey}`
    );
    this.EpisodesDetails = seasonEpisodeDetails.data;
    if (this.EpisodesDetails.seasons[0].name !== "Specials") {
      this.SeriesNumber = this.$route.params.number - 1;
    } else {
      this.SeriesNumber = this.$route.params.number;
    }
  },
  filters: {
    details(value) {
      if (value == "") {
        return "We don't have an overview translated in English. Help us expand our database by adding one.";
      } else {
        return value.slice(0, value.indexOf("."));
      }
    },
    name(value) {
      if (value == "") {
        return "No data has been added.";
      } else {
        return value;
      }
    },
  },
};
</script>

<style scoped>
.wrapper h3 {
  position: absolute;
  left: 325px;
  top: 118px;
}
.col-md-5 {
  margin: 15px 0;
}
.first_col {
  margin: 15px;
}
.row button {
  width: 80px;
}
bdi {
  display: inline-block;
  position: absolute;
  margin: 10px;
}
.second_col {
  padding: 8px;
  margin: 0 0 0 100px;
}
.third_col {
  padding: 8px;
}
.row .col-md-5 img {
  width: 66px;
  height: 66px;
  border-radius: 5px;
}
.details {
  margin: -70px 0 0 240px;
  position: absolute;
  max-width: 1050px;
}
.episode button {
  border: 3px white;
  background-color: white;
  margin: 3px 0 0 580px;
}
.episode button:hover {
  color: silver;
}
h5 {
  margin: 10px 0 0 100px;
}
.detailss {
  float: right;
  margin: -100px 15px;
}
strong {
  margin: -100px 0 0 240px;
  position: absolute;
}

.episode hr {
  margin: 0;
}
.episode {
  width: 1320px;
  min-height: 164px;
  border-radius: 5px;
  margin: 20px 0 45px 100px;
  border: 1px solid silver;
  box-shadow: 0 2px 8px rgb(0 0 0 / 10%);
}
.episode img {
  width: 227px;
  height: 128px;
  margin: -1px 0 0 0;
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
</style>