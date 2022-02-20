<template>
  <div v-if="movieDetails">
    <Header moviesOrTvEndpoint="movie">
      <h1 slot="title_one">
        {{ movieDetails.title }}({{ movieDetails.release_date.slice(0, 4) }})
      </h1>
      <a slot="title_two">
        {{ movieDetails.release_date }} ({{
          movieDetails.production_companies[0].origin_country
        }})</a
      >
        <p slot="runtime">
          {{
            `${(movieDetails.runtime / 60) ^ 0}h:` +
            (movieDetails.runtime % 60)
          }}min
        </p>
    </Header>
    <TopBilledCast moviesOrTvEndpoint="movie"></TopBilledCast>
        <div class="logo_and_data">
      <a><img src="@/assets/facebook.png" /></a>
      <a><img src="@/assets/twitter.png" /></a><br /><br />
      <p class="keyword_title">
        Status 
      </p>
      <p>{{ movieDetails.status }}</p>
      <p class="keyword_title">
        Original Language
      </p>
      <p>{{ movieDetails.original_language | to-uppercase }}</p>
        <p class="keyword_title">
        Budget 
        
      </p>
      <p>${{ movieDetails.budget }}</p>
      <p class="keyword_title">
        Revenue 
       
      </p>
      <p> ${{ movieDetails.revenue }}</p>
      <p class="keyword_title">Keywords</p>

      <p class="kewords" v-for="keyword in keywords" :key="keyword.id">{{ keyword.name }}</p>
      <a v-if="keywords.length == 0">No keywords have been added.</a>
    </div>
    <Reviews moviesOrTvEndpoint="movie"></Reviews>
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
    Reviews

  },
  data() {
    return {
      movieDetails: null,
      keywords: {},
    };
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
  },
   filters: {
    "to-uppercase"(value) {
      return value.toUpperCase();
    }
    }
};
</script>
<style  scoped>
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
.keyword_title{
  font-weight: 700;
}
.network_logo{
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
</style>
