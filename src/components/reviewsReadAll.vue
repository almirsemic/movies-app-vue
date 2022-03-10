<template>
  <div v-if="MovieDetails">
    <div class="wrapper">
      <img
        :src="`https://themoviedb.org/t/p/w440_and_h660_face/${this.MovieDetails.poster_path}`"
      />
      <h4 v-if="MovieDetails.title">
        {{ MovieDetails.title }}({{ MovieDetails.release_date.slice(0, 4) }})
      </h4>
      <h4 v-if="MovieDetails.name">
        {{ MovieDetails.name }}({{ MovieDetails.first_air_date.slice(0, 4) }})
      </h4>
      <router-link :to="`/${this.$route.params.type}/` + MovieDetails.id"
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
    <div class="review" v-for="review in reviews" :key="review.id">
      <img
        v-if="
          review.author_details.avatar_path &&
          /^[a-z][a-z0-9+.-]*:/.test(
            review.author_details.avatar_path.substring(1)
          )
        "
        :src="review.author_details.avatar_path.substring(1)"
      />
      <h5
        v-if="
          !review.author_details.avatar_path ||
          !/^[a-z][a-z0-9+.-]*:/.test(
            review.author_details.avatar_path.substring(1)
          )
        "
      >
        {{ review.author[0] }}
      </h5>
      <div class="inside">
        <a>A review by {{ review.author }} <br /></a>
        <p class="subtitle">
          Written by {{ review.author }} on {{ review.created_at | date }}
        </p>
        <p>
          {{ review.content | snippet }}
          <span @click="transitionToReview(review.id)">Read more</span>
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
      reviews: [],
      MovieDetails: null,
    };
  },
  methods: {
    transitionToReview(id) {
      this.$router.push({
        name: "reviewsReadMore",
        params: { id, type: this.$route.params.type },
      });
    },
  },
  async created() {
    const ApiKey = "ffebf14b46dcd2b2bb0af17fdfffaa0c";

    const allReviews = await axios.get(
      `${this.$route.params.type}/${this.$route.params.id}/reviews?api_key=${ApiKey}`
    );
    this.reviews = allReviews.data.results;
    const details = await axios.get(
      `${this.$route.params.type}/${allReviews.data.id}?api_key=${ApiKey}`
    );
    this.MovieDetails = details.data;
  },

  filters: {
    snippet(value) {
      return value.length > 900 ? value.slice(0, 622) + "...." + "   " : value;
    },
    date(value) {
      if (value) {
        return value.slice(0, 10);
      }
    },
  },
};
</script>

<style scoped>
span:hover {
  color: silver;
}
.subtitle {
  font-size: 0.9em;
  font-weight: 300;
}
button {
  margin: -60px 0 0 220px;
}

.inside a {
  font-weight: 700;
}
h4 {
  padding: 40px;
  margin: 0 0 0 180px;
  font-weight: 700;
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
.review {
  border: 1px solid silver;
  border-radius: 10px;
  padding: 25px;
  margin: 50px 0 60px 350px;
  width: 1022px;
  height: 314px;
}
.review img {
  border-radius: 50%;
}
h5 {
  border-radius: 50%;
  background-color: green;
  width: 80px;
  height: 80px;
  text-align: center;
  padding: 25px;
}
.inside {
  width: 750px;
  margin: -80px 0 0 120px;
}
</style>