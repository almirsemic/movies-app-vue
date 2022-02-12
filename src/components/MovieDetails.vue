<template>
  <div v-if="movieDetails">
    <div
      class="background"
      :style="{
        backgroundImage: `url('https://themoviedb.org/t/p/original/${movieDetails.backdrop_path}')`,
      }"
    >
      <div class="text_on_picture">
        <h1>
          {{ movieDetails.title }}({{
            movieDetails.release_date.slice(0, 4)
          }})
        </h1>
        <a>
          {{ movieDetails.release_date }} ({{
            movieDetails.production_companies[0].origin_country
          }})</a
        >
        <p v-for="genre in movieDetails.genres" :key="genre.id">{{ genre.name }}</p>
        <p>
          {{
            `${(movieDetails.runtime / 60) ^ 0}h:` +
            (movieDetails.runtime % 60)
          }}min
        </p>
        <div class="actor_and_interest" v-if="actors">
          <ul>
            <li v-for="actor in actors.crew.slice(0, 3)" :key="actor.credit_id">
              {{ actor .name | to-uppercase }} <br />
              {{ actor .job }}
            </li>
          </ul>
          <ul>
            <li v-for="actor  in actors.crew.slice(3, 5)" :key="actor.credit_id">
              {{ actor .name | to-uppercase }} <br />
              {{ actor .job }}
            </li>
          </ul>
          <ul>
            <li v-for="actor  in actors.crew.slice(5, 7)" :key="actor.credit_id">
              {{ actor .name | to-uppercase }} <br />
              {{ actor .job }}
            </li>
          </ul>
        </div>
        <div class="percentage">
          <a>{{ movieDetails.vote_average * 10 }}%</a>
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
            :src="`https://www.youtube.com/embed/${youTubeUrl}`"
          ></iframe>
        </div>
        <div class="overview">
          <h5>Overview</h5>
          <label>{{ movieDetails.overview | overview }}</label>
        </div>
      </div>
      <img
        class="picture"
        :src="`https://themoviedb.org/t/p/w440_and_h660_face/${movieDetails.poster_path}`"
      />
    </div>
    <div class="wrapper" v-if="actors">
      <h4>Top Billed Cast</h4>
      
        <div class="actors_and_pictures"  v-for="interest in actors.cast.slice(0, 8)" :key="interest.id">
        <img
          :src="
            'https://themoviedb.org/t/p/w440_and_h660_face' + interest.profile_path
          "
        />
        <p>{{ interest.name }} <br /></p>
        <label>{{ interest.character }}</label>
      </div>
      
      <a @click="transitionToFilmActors(movieDetails.id)">View More</a>
    </div>
    <strong>Full Cast & Crew </strong>
    <hr />
    <div class="logo_and_data">
      <a><img src="@/assets/facebook.png" /></a>
      <a><img src="@/assets/twitter.png" /></a><br /><br />
      <p>
        Status <br />
        {{ movieDetails.status }}
      </p>
      <p>
        Original Language <br />
        {{ movieDetails.original_language | to-uppercase }}
      </p>
      <p>
        Budget <br />
        ${{ movieDetails.budget }}
      </p>
      <p>
        Revenue <br />
        ${{ movieDetails.revenue }}
      </p>

      <p>Keywords</p>

      <p class="kewords" v-for="keyword in keywords" :key="keyword.id">{{ keyword.name }}</p>
    </div>
    <p class="numberOfReviews">Reviews ({{ Object.keys(reviews).length }})</p>

    <div class="review" v-if="reviews[0]">
      <img  v-if="
          reviews[0].author_details.avatar_path &&
          /^[a-z][a-z0-9+.-]*:/.test(
            reviews[0].author_details.avatar_path.substring(1)
          )
        "
        :src="reviews[0].author_details.avatar_path.substring(1)"
      />
      <h5 class="noPicture"
        v-if="
          !reviews[0].author_details.avatar_path ||
          !/^[a-z][a-z0-9+.-]*:/.test(
            reviews[0].author_details.avatar_path.substring(1)
          )
        "
      >
        {{ reviews[0].author[0] }}
      </h5>
      <div class="autor_review"  v-if="Object.keys(reviews).length != 0">
        <a>A review by {{ reviews[0].author }}<br /></a>
        <p class="subtitle">Written by {{ reviews[0].author }} on {{ reviews[0].created_at | date }}</p>
        <p>
          <br />
          {{ reviews[0].content | snippet }}
          <span @click="transitionToReview(reviews[0].id)">Read More</span>
        </p>
      </div>
    </div>

    <button v-if="Object.keys(reviews).length != 0" type="button" class="btn btn-secondary" @click="transitionToAllReviews(movieDetails.id)">
      Show All Reviews
    </button>
    <hr />
  </div>
</template>

<script>
export default {
  data() {
    return {
      movieDetails: null,
      keywords: {},
      actors: null,
      reviews: {},
      youTubeWindow: false,
      youTubeUrl: "", 
    }
  },
  methods: {
   transitionToReview(id){
     this.$router.push({ name: 'reviewsReadMore', params: { id } })
   },
   transitionToAllReviews(id){
     this.$router.push({ name: 'reviewsReadAll', params: { id } })
   },
   transitionToFilmActors(id){
     this.$router.push({ name: 'filmActors', params: { id } })

   }
  },
  created() {
    const ApiKey = "ffebf14b46dcd2b2bb0af17fdfffaa0c";

    fetch(
      `https://api.themoviedb.org/3/movie/${this.$route.params.id}?api_key=${ApiKey}`
    )
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        this.movieDetails = data;
      });
    fetch(
      `https://api.themoviedb.org/3/movie/${this.$route.params.id}/keywords?api_key=${ApiKey}`
    )
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        this.keywords = data.keywords;
      });
    fetch(
      `https://api.themoviedb.org/3/movie/${this.$route.params.id}/credits?api_key=${ApiKey}`
    )
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        this.actors = data;
      });
    fetch(
      `https://api.themoviedb.org/3/movie/${this.$route.params.id}/reviews?api_key=${ApiKey}`
    )
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        this.reviews = data.results;
      });
    fetch(
      `https://api.themoviedb.org/3/movie/${this.$route.params.id}/videos?api_key=${ApiKey}`
    )
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        this.youTubeUrl = data.results[0].key;
      });
  },
  filters: {
    "to-uppercase"(value) {
      return value.toUpperCase();
    },
    snippet(value) {
      return value.length > 900
        ? value.slice(0, 622) + "..." + "   "
        : value;
    },
    overview(value) {
      if (value.length > 200) {
        return value.slice(0, value.indexOf("."));
      } else {
        return value;
      }
    },
    date(value) {
      if (value) {
        return value.slice(0, 10);
      }
    },
    lower(value) {
      return value.toLowerCase();
    },
  },
};
</script>

<style scoped>
span:hover {
  color: silver;
}
.noPicture{
  border-radius: 50%;
  background-color: green;
  width: 80px;
  height: 80px;
  text-align: center;
  padding: 25px;
}
.subtitle{
    font-size: 0.9em;
    font-weight: 300;
}
.autor_review a {
  font-weight: 700;
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

.actor_and_interest ul li {
  margin: 15px 0 0 0;
  font-weight: 500;
  color: white;
}
.btn-secondary {
    margin: -15px 0 20px 920px;
}
.numberOfReviews {
  margin: 40px 0 -20px 62px;
  font-weight: 700;
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
.wrapper a {
  margin: 150px 0 0 20px;
  min-width: 110px;
  height: 40px;
  font-weight: bold;
  color: #000;
}
.wrapper a:hover {
  color: silver;
}

strong {
  font-weight: 600;
  font-size: 1.1em;
  margin: 0 0 0 62px;
}
hr {
  width: 1050px;
  margin: 20px 0 0 50px;
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
.autor_review {
  width: 750px;
  margin: -80px 0 0 120px;
}
.wrapper h4 {
  position: absolute;
  top: 580px;
  left: -5px;
  margin: 30px 0 0 62px;
  font-weight: 600;
  font-size: 1.4em;
  margin-bottom: 20px;
}
.wrapper {
  width: 1120px;
  height: 423px;
  margin: 20px 10px 20px 50px;
  display: flex;
  overflow-x: auto;
  padding: 38px 0;
}
.actors_and_pictures {
  background-color: white;
  border-radius: 10px;
  height: 280px;
  width: 152px;
  margin: 25px 5px;
  border: 1px solid #ccc;
}
.wrapper img {
  width: 140px;
  height: 165px;
  display: inline-block;
  padding: 10px;
  border-radius: 20px;
  margin: 0 0 0 5px;
}
.wrapper label {
  text-align: center;
  font-style: normal;
  font-weight: normal;
  width: 150px;
}
.wrapper p {
  text-align: center;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 20px;
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

.play_trailer {
  position: absolute;
  left: 350px;
  top: 108px;
  font-weight: 600;
  font-size: 1.3em;
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
.user_score a {
  position: absolute;
  width: 46px;
  height: 46px;
  margin: 0 0 0 80px;
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
.overview {
  margin: 80px 0 0 0;
}
.overview h5 {
  font-weight: 600;
  font-size: 1.3em;
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
.picture {
  width: 302px;
  height: 450px;
  position: absolute;
  margin: 30px 0 0 100px;
  border-radius: 10px;
}

.background {
  color: white;
  width: 100%;
  height: 511px;
  background: rgba(0, 0, 0, 0.7);
  background-size: cover;
  background-blend-mode: darken;
}
</style>