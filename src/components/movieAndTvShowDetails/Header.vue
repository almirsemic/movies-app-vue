<template>
  <div v-if="movieAndTvDetails && actors">
    <div
      class="background"
      :style="{
        backgroundImage: `url('https://themoviedb.org/t/p/original/${movieAndTvDetails.backdrop_path}')`,
      }"
    >
      <div class="text_on_picture">
        <slot name="title"></slot>
        <slot name="title_one"></slot>
        <slot name="title_two"></slot>
        <p v-for="genre in movieAndTvDetails.genres" :key="genre.id">
          {{ genre.name }}
        </p>
        <slot name="runtime"></slot>
        <div class="actor_and_interest" v-if="actors">
          <ul>
            <li
              v-for="actor in actors.crew.slice(0, 3)"
              :key="actor.credit_id"
              @click="transitionToActorDetails(actor.id)"
            >
              {{ actor.name | to-uppercase }} <br />
              {{ actor.job }}
            </li>
          </ul>
          <ul>
            <li
              v-for="actor in actors.crew.slice(3, 5)"
              :key="actor.credit_id"
              @click="transitionToActorDetails(actor.id)"
            >
              {{ actor.name | to-uppercase }} <br />
              {{ actor.job }}
            </li>
          </ul>
          <ul>
            <li
              v-for="actor in actors.crew.slice(5, 7)"
              :key="actor.credit_id"
              @click="transitionToActorDetails(actor.id)"
            >
              {{ actor.name | to-uppercase }} <br />
              {{ actor.job }}
            </li>
          </ul>
        </div>
        <div class="percentage">
          <a>{{ movieAndTvDetails.vote_average * 10 }}%</a>
        </div>
        <div class="user_score">
          <a
            >User <br />
            Score</a
          >
        </div>
        <div class="icons">
          <a><img src="@/assets/heart.png" /></a>
          <a><img src="@/assets/bookmark.png" /></a>
          <a><img src="@/assets/star.png" /></a>
        </div>
        <div class="play_trailer">
          <svg
            @click="youTubeWindow = true"
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-play-fill"
            viewBox="0 0 16 16"
          >
            <path
              d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"
            />
          </svg>
          <a @click="youTubeWindow = true">Play Trailer</a>
        </div>
        <div class="youtube" v-if="youTubeWindow">
          <button @click="youTubeWindow = false">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-x-circle"
              viewBox="0 0 16 16"
            >
              <path
                d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
              />
              <path
                d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
              />
            </svg>
          </button>
          <iframe
            width="660"
            height="350"
            :src="`https://www.youtube.com/embed/${youTubeURL}`"
          ></iframe>
        </div>
        <div class="overview">
          <h5>Overview</h5>
          <label>{{ movieAndTvDetails.overview | overview }}</label>
        </div>
      </div>
      <img
        class="picture"
        :src="`https://themoviedb.org/t/p/w440_and_h660_face/${movieAndTvDetails.poster_path}`"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    endpointType: {
      type: String,
    },
  },
  data() {
    return {
      movieAndTvDetails: null,
      actors: null,
      youTubeWindow: false,
      youTubeURL: "",
    };
  },
  methods: {
    transitionToActorDetails(id) {
      this.$router.push({ name: "actorDetails", params: { id } });
    },
  },
  created() {
    const ApiKey = "ffebf14b46dcd2b2bb0af17fdfffaa0c";

    fetch(
      `https://api.themoviedb.org/3/${this.endpointType}/${this.$route.params.id}?api_key=${ApiKey}`
    )
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        this.movieAndTvDetails = data;
      });
    fetch(
      `https://api.themoviedb.org/3/${this.endpointType}/${this.$route.params.id}/credits?api_key=${ApiKey}`
    )
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        this.actors = data;
      });
    fetch(
      `https://api.themoviedb.org/3/${this.endpointType}/${this.$route.params.id}/videos?api_key=${ApiKey}`
    )
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        if (data.results.length > 0) {
          this.youTubeURL = data.results[0].key;
        } else {
          this.youTubeURL = "";
        }
      });
  },
  filters: {
    "to-uppercase"(value) {
      return value.toUpperCase();
    },
    overview(value) {
      if (value.length > 200) {
        return value.slice(0, value.indexOf("."));
      } else {
        return value;
      }
    },
  },
};
</script>

<style scoped>
.background {
  color: white;
  width: 100%;
  height: 511px;
  background: rgba(0, 0, 0, 0.7);
  background-size: cover;
  background-blend-mode: darken;
}
.text_on_picture p {
  display: inline-block;
  margin-left: 10px;
}
.text_on_picture {
  position: absolute;
  left: 450px;
  width: 1070px;
  height: 430px;
  margin: 25px 0 0 0;
}
.text_on_picture h1 {
  font-style: normal;
  font-weight: 700;
  font-size: 35px;
  line-height: 44px;
}
.actor_and_interest ul li {
  margin: 15px 0 0 0;
  font-weight: 500;
  color: white;
}
.actor_and_interest ul {
  margin-left: 70px;
  list-style: none;
}
.actor_and_interest {
  display: inline-flex;
  position: absolute;
  left: -100px;
  top: 260px;
}
.percentage a {
  position: absolute;
  width: 70px;
  height: 70px;
  text-align: center;
  padding: 18px;
  background-color: #081c22;
  border-radius: 50%;
  border: 3px solid #ccc;
}

.percentage {
  margin: 0 0 10px 0;
}
.user_score a {
  position: absolute;
  width: 46px;
  height: 46px;
  margin: 0 0 0 80px;
}
.icons {
  position: absolute;
  left: 150px;
}
.icons a {
  display: inline-block;
  width: 46px;
  height: 46px;
  text-align: center;
  padding: 8px;
  margin-left: 10px;
  background-color: #032541;
}
.play_trailer {
  position: absolute;
  left: 350px;
  top: 108px;
  font-weight: 600;
  font-size: 1.3em;
}
.youtube button {
  top: 0px;
  left: 623px;
  position: absolute;
  background-color: black;
  color: silver;
  border: 1px solid black;
  border-radius: 4px;
}
.youtube {
  position: absolute;
  width: 660px;
  height: 381px;
  padding: 30px 0 0 0;
  background-color: black;
}
.overview {
  margin: 80px 0 0 0;
}
.overview h5 {
  font-weight: 600;
  font-size: 1.3em;
}
.picture {
  width: 302px;
  height: 450px;
  position: absolute;
  margin: 30px 0 0 100px;
  border-radius: 10px;
}
</style>