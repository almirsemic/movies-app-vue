<template>
  <div class="container">
    <div class="search">
      <input
        type="search"
        placeholder="Search"
        class="form-control"
        v-model="search"
        v-on:keyup="searchReq()"
        v-on:keyup.enter="searchRes(search)"
      />
      <div v-if="data" class="results">
        <ul
          v-for="oneData in data.slice(0, 5)"
          :key="oneData.id"
          @click="searchRes(oneData.name || oneData.title)"
        >
          <li>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-search"
              viewBox="0 0 16 16"
            >
              <path
                d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"
              /></svg
            >&nbsp;&nbsp;{{ oneData.media_type }}:&nbsp;&nbsp;{{ oneData.name }}
            {{ oneData.title }}
          </li>
        </ul>
      </div>
    </div>
    <div class="cards">
      <div class="search_results">
        <div class="result">
          <h4>Search Results</h4>
          <br />
          <p @click="viewMovies()">
            Movies <i>{{ movies }}</i>
          </p>
          <p @click="viewTvShows()">
            TV Shows <i>{{ tvShows }}</i>
          </p>
          <p @click="viewPeople()">
            People <i>{{ people }}</i>
          </p>
          <p>
            Collections <i>{{ collections }}</i>
          </p>
          <p>
            Companies <i>{{ companies }}</i>
          </p>
          <p>
            Keywords <i>{{ keywords }}</i>
          </p>
          <p @click="viewAll()">
            View All <i v-if="resultSearch">{{ resultSearch.length }}</i>
          </p>
        </div>
      </div>
      <label v-if="!resultSearch"
        >There are no movies that matched your query.</label
      >
      <div class="card" v-for="oneData in filterSearch" :key="oneData.id">
        <router-link
          class="router_link"
          :to="'/' + oneData.media_type + '/' + oneData.id"
          ><img
            v-if="oneData.media_type != 'person' && oneData.poster_path != null"
            :src="`https://themoviedb.org/t/p/w440_and_h660_face/${oneData.poster_path}`"
        /></router-link>
        <router-link
          class="router_link"
          :to="'/' + oneData.media_type + '/' + oneData.id"
          ><img
            v-if="
              oneData.media_type == 'person' && oneData.profile_path != null
            "
            :src="`https://themoviedb.org/t/p/w440_and_h660_face/${oneData.profile_path}`"
        /></router-link>
        <router-link
          class="router_link"
          :to="'/' + oneData.media_type + '/' + oneData.id"
          ><img
            src="@/assets/nophoto.jpg"
            v-if="
              (oneData.profile_path == null &&
                oneData.media_type == 'person') ||
              (oneData.poster_path == null && oneData.media_type != 'person')
            "
        /></router-link>
        <div class="data">
          <router-link
            class="router_link"
            :to="'/' + oneData.media_type + '/' + oneData.id"
            ><strong
              >{{ oneData.name }} {{ oneData.title }}</strong
            ></router-link
          ><br />
          <i v-if="oneData.media_type != 'person'">
            {{ oneData.first_air_date }} {{ oneData.release_date }}</i
          ><br /><br />
          <small v-if="oneData.media_type != 'person'">{{
            oneData.overview | overview
          }}</small>
          <p v-if="oneData.media_type == 'person'">
            Acting as:&nbsp;&nbsp;<small
              v-for="data in oneData.known_for"
              :key="data.id"
              ><router-link
                class="router_link"
                :to="'/' + data.media_type + '/' + data.id"
                >{{ data.title || data.original_name }},
              </router-link></small
            >
          </p>
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
      search: "",
      data: null,
      movies: 0,
      tvShows: 0,
      people: 0,
      companies: 0,
      collections: 0,
      keywords: 0,
      resultSearch: null,
      filterSearch: null,
    };
  },
  methods: {
    async searchReq() {
      if (this.search.length >= 1) {
        const searchResponse = await axios.get(
          `search/multi?api_key=ffebf14b46dcd2b2bb0af17fdfffaa0c&query=${this.search}`
        );
        this.data = searchResponse.data.results;
      }
    },
    async searchRes(search) {
      if (search.length > 0) {
        const searchResponse = await axios.get(
          `search/multi?api_key=ffebf14b46dcd2b2bb0af17fdfffaa0c&query=${search}`
        );
        this.resultSearch = searchResponse.data.results;
        this.filterSearch = this.resultSearch;
        if (this.resultSearch) {
          this.movies = 0;
          this.tvShows = 0;
          this.people = 0;
          this.companies = 0;
          this.collections = 0;
          this.keywords = 0;
          for (let i = 0; i < this.resultSearch.length; i++) {
            if (this.resultSearch[i].media_type == "tv") {
              this.tvShows++;
            } else if (this.resultSearch[i].media_type == "movie") {
              this.movies++;
            } else if (this.resultSearch[i].media_type == "person") {
              this.people++;
            } else if (this.resultSearch[i].media_type == "companies") {
              this.companies++;
            } else if (this.resultSearch[i].media_type == "collections") {
              this.collections++;
            } else if (this.resultSearch[i].media_type == "keywords") {
              this.keywords++;
            }
          }
        }
      }
    },
    viewPeople() {
      this.filterSearch = this.resultSearch.filter(
        (el) => el.media_type == "person"
      );
    },
    viewTvShows() {
      this.filterSearch = this.resultSearch.filter(
        (el) => el.media_type == "tv"
      );
    },
    viewMovies() {
      this.filterSearch = this.resultSearch.filter(
        (el) => el.media_type == "movie"
      );
    },
    viewAll() {
      this.filterSearch = this.resultSearch;
    },
  },
  filters: {
    overview(value) {
      if (value && value.length > 200) {
        return value.slice(0, value.indexOf("."));
      } else {
        return value;
      }
    },
  },
};
</script>

<style scoped>
.router_link:hover {
  color: silver;
}
.router_link {
  text-decoration: none !important;
  color: black;
}
label {
  margin: 10px 30px;
}
.data {
  position: absolute;
  margin: 0 0 0 120px;
  max-width: 850px;
}
.cards {
  margin: 30px 0;
}
.card img {
  width: 100px;
  height: 150px;
  border-radius: 3px 0 0 3px;
}
.card {
  box-shadow: rgb(0 0 0 / 10%) -8px 0px 10px -5px;
  height: 152px;
  width: 1000px;
  float: right;
}
.result h4 {
  padding: 17px;
  background-color: #f4f4f4;
  height: 70px;
  margin-top: -15px;
  margin-right: -1px;
}
.result {
  margin-top: 15px;
}
.result p {
  padding: 10px;
  margin: -5px 0;
}
.result i {
  float: right;
  margin: 0 20px 0 0;
}
.result p:hover {
  background-color: #ccc;
}
.search_results {
  width: 260px;
  height: 380px;
  border: 1px solid #f4f4f4;

  float: left;
}
.search input {
  position: absolute;
  width: 1240px;
  margin: 35px 0 0 30px;
}
.search {
  min-height: 300px;
  background-image: url("~@/assets/cinema.jpg");
  background-position: 60% 60%;
  background-repeat: no-repeat;
  background-size: 100%;
}
ul:hover {
  background-color: white;
  color: black;
}
ul {
  border-radius: 5px;
  margin: 0 10px;
}
li {
  list-style: none;
}
.results {
  padding: 10px;
  border-radius: 5px;
  background-color: rgba(0, 0, 0, 0.5);
  width: 1260px;
  color: white;
  position: absolute;
  margin: 80px 0 0 20px;
}
</style>