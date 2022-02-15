<template>
  <div v-if="MovieDetails">
    <img
      class="picture"
      :src="`https://themoviedb.org/t/p/w440_and_h660_face/${this.MovieDetails.poster_path}`"
    />
    <div class="wrapper">
      <div class="wrapper_one">
        <h2>
          {{ MovieDetails.title }}({{
            MovieDetails.release_date.slice(0, 4)
          }})
        </h2>
        <p class="subtitle"> 
          Written by {{ review.author }} on {{ review.created_at | date }}
        </p>
        <br /><br /><br />
        <p>
          {{ review.content }}
        </p>
      </div>
      <router-link :to="'/movie/' + MovieDetails.id"
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      MovieDetails: null,
      review: [],
    };
  },
  created() {
    const ApiKey = "ffebf14b46dcd2b2bb0af17fdfffaa0c";

    fetch(
      `https://api.themoviedb.org/3/review/${this.$route.params.id}?api_key=${ApiKey}`
    )
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        this.review = data;
        return data;
      })
      .then((data) => {
        fetch(
          `https://api.themoviedb.org/3/movie/${data.media_id}?api_key=${ApiKey}`
        )
          .then((data) => {
            return data.json();
          })
          .then((data) => {
            this.MovieDetails = data;
          });
      });
  },
  filters: {
    date(value) {
      return value.slice(0, 10);
    },
  },
};
</script>

<style scoped>
.btn-secondary {
  margin: -15px 0 20px 920px;
}
.subtitle {
  font-size: 0.9em;
  font-weight: 300;
}
img {
  width: 200px;
  margin: 20px 0 0 20px;
  position: absolute;
}
.wrapper {
  left: 248px;
  min-height: 100%;
  box-shadow: rgb(0 0 0 / 10%) -8px 0px 10px -5px;
  position: absolute;
}
.wrapper_one {
  margin: 20px 170px 0 20px;
  padding: 30px;
}
h2 {
  font-size: 20px;
}
</style>