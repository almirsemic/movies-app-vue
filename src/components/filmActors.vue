<template>
  <div v-if="movieDetails">
    <div class="tape">
      <img
        :src="`https://themoviedb.org/t/p/w440_and_h660_face/${this.movieDetails.poster_path}`"
      />
      <h4 v-if="movieDetails.title">
        {{ movieDetails.title }}({{ movieDetails.release_date.slice(0, 4) }})
      </h4>
      <h4 v-if="movieDetails.name">
        {{ movieDetails.name }}({{ movieDetails.first_air_date.slice(0, 4) }})
      </h4>
      <router-link :to="`/${this.$route.params.type}/` + movieDetails.id"
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

    <div class="container">
      <div class="row">
        <div class="col-md-6">
          <div class="coast_and_crew">
            <p>Coast({{ actors.cast.length }})</p>
          </div>
          <div class="widow" v-for="actor in actors.cast" :key="actor.id">
            <img
              v-if="actor.profile_path != null"
              @click="transitionToActorDetails(actor.id)"
              :src="
                'https://themoviedb.org/t/p/w440_and_h660_face' +
                actor.profile_path
              "
            />
            <img
              v-if="actor.profile_path == null"
              src="@/assets/image.png"
              @click="transitionToActorDetails(actor.id)"
            />
            <div class="caracter">
              <p @click="transitionToActorDetails(actor.id)">
                {{ actor.name }}
              </p>
              <label>{{ actor.character }}</label>
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <div class="coast_and_crew">
            <p>Crew({{ actors.crew.length }})</p>
          </div>
          <div
            class="widow"
            v-for="actor in actors.crew"
            :key="actor.credit_id"
          >
            <img
              v-if="actor.profile_path != null"
              :src="
                'https://themoviedb.org/t/p/w440_and_h660_face' +
                actor.profile_path
              "
              @click="transitionToActorDetails(actor.id)"
            />
            <img
              v-if="actor.profile_path == null"
              src="@/assets/image.png"
              @click="transitionToActorDetails(actor.id)"
            />
            <div class="caracter">
              <p @click="transitionToActorDetails(actor.id)">
                {{ actor.name }}
              </p>
              <label>{{ actor.job }}</label>
            </div>
          </div>
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
      movieDetails: null,
      actors: [],
    };
  },
  methods: {
    transitionToActorDetails(id) {
      this.$router.push({ name: "actorDetails", params: { id } });
    },
  },
  async created() {
    const ApiKey = "ffebf14b46dcd2b2bb0af17fdfffaa0c";

    const allActors = await axios.get(
      `${this.$route.params.type}/${this.$route.params.id}/credits?api_key=${ApiKey}`
    );
    this.actors = allActors.data;
    const details = await axios.get(
      `${this.$route.params.type}/${allActors.data.id}?api_key=${ApiKey}`
    );
    this.movieDetails = details.data;
  },
};
</script>

<style scoped>
.coast_and_crew {
  font-weight: 700;
  margin: 50px 0 0 130px;
}

.caracter p {
  margin: 10px 0 0 0;
  font-weight: 700;
}

.caracter {
  margin: -75px 0 0 130px;
}

.widow img {
  width: 66px;
  height: 66px;
  margin: 35px 0 0 30px;
  border-radius: 5px;
}

.widow {
  margin: 0 0 0 90px;
}

button {
  margin: -60px 0 0 220px;
}
h4 {
  padding: 40px;
  margin: 0 0 0 180px;
  font-weight: 700;
}
.tape img {
  width: 70px;
  height: 100px;
  position: absolute;
  left: 130px;
  margin: 10px 0;
}
.tape {
  background-color: rgba(152, 172, 179, 0.705);
  height: 120px;
  margin: 20px 0 0 0;
  color: white;
}
</style>