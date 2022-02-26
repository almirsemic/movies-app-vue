<template>
  <div>
    <p class="numberOfReviews">Reviews ({{ Object.keys(reviews).length }})</p>

    <div class="review" v-if="reviews[0]">
      <img
        v-if="
          reviews[0].author_details.avatar_path &&
          /^[a-z][a-z0-9+.-]*:/.test(
            reviews[0].author_details.avatar_path.substring(1)
          )
        "
        :src="reviews[0].author_details.avatar_path.substring(1)"
      />
      <h5
        class="noPicture"
        v-if="
          !reviews[0].author_details.avatar_path ||
          !/^[a-z][a-z0-9+.-]*:/.test(
            reviews[0].author_details.avatar_path.substring(1)
          )
        "
      >
        {{ reviews[0].author[0] }}
      </h5>
      <div class="autor_review" v-if="Object.keys(reviews).length != 0">
        <a>A review by {{ reviews[0].author }}<br /></a>
        <p class="subtitle">
          Written by {{ reviews[0].author }} on
          {{ reviews[0].created_at | date }}
        </p>
        <p>
          <br />
          {{ reviews[0].content | snippet }}
          <span @click="transitionToReview(reviews[0].id)">Read More</span>
        </p>
      </div>
    </div>

    <button
      v-if="Object.keys(reviews).length != 0"
      type="button"
      class="btn btn-secondary"
      @click="transitionToAllReviews(id)"
    >
      Show All Reviews
    </button>
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
      reviews: {},
      id: "",
    };
  },
  methods: {
    transitionToReview(id) {
      this.$router.push({
        name: "reviewsReadMore",
        params: { id, type: this.endpointType },
      });
    },
    transitionToAllReviews(id) {
      this.$router.push({
        name: "reviewsReadAll",
        params: { id, type: this.endpointType },
      });
    },
  },
  created() {
    const ApiKey = "ffebf14b46dcd2b2bb0af17fdfffaa0c";

    fetch(
      `https://api.themoviedb.org/3/${this.endpointType}/${this.$route.params.id}/reviews?api_key=${ApiKey}`
    )
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        this.reviews = data.results;
        this.id = data.id;
      });
  },
  filters: {
    snippet(value) {
      return value.length > 900 ? value.slice(0, 622) + "..." + "   " : value;
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
.btn-secondary {
  margin: -15px 0 20px 920px;
}
span:hover {
  color: silver;
}
.numberOfReviews {
  margin: 40px 0 -20px 62px;
  font-weight: 700;
}
.review {
  border: 1px solid silver;
  border-radius: 10px;
  padding: 25px;
  margin: 48px;
  width: 1022px;
  height: 314px;
}
.review img {
  border-radius: 50%;
}
.noPicture {
  border-radius: 50%;
  background-color: green;
  width: 80px;
  height: 80px;
  text-align: center;
  padding: 25px;
}
.autor_review a {
  font-weight: 700;
}
.autor_review {
  width: 750px;
  margin: -80px 0 0 120px;
}
.subtitle {
  font-size: 0.9em;
  font-weight: 300;
}
</style>