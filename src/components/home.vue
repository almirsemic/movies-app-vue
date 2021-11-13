<template>
  <div class="container">
    <h3>Most Popular</h3>
    <div
      class="button"
      :class="{ available: available, notAvailable: notAvailable }"
    >
      <button
        @click="(first = true), (available = true), (notAvailable = false)"
        id="movies"
      >
        Movies
      </button>
      <button
        @click="(first = false), (notAvailable = true), (available = false)"
        id="tvShows"
      >
        Tv Shows
      </button>
    </div>
    <div class="wrapper" v-show="first">
      <div v-for="movie in popularMovies" :key="movie.id" class="old">
        <img
          :src="
            'https://themoviedb.org/t/p/w440_and_h660_face' + movie.poster_path
          "
        />
        <p>{{ movie.title }}</p>
      </div>
    </div>
    <div class="wrapper" v-show="!first">
      <div v-for="one in mostPopular" :key="one.id" class="old">
        <img
          :src="
            'https://themoviedb.org/t/p/w440_and_h660_face' + one.poster_path
          "
        />
        <p>{{ one.name }}</p>
      </div>
    </div>
    <hr />
    <h3>Now Playing</h3>
    <div
      class="button1"
      :class="{ available1: available1, notAvailable1: notAvailable1 }"
    >
      <button
        @click="(second = true), (available1 = true), (notAvailable1 = false)"
        id="movies1"
      >
        Movies
      </button>
      <button
        @click="(second = false), (notAvailable1 = true), (available1 = false)"
        id="tvShows1"
      >
        Tv Shows
      </button>
    </div>
    <div class="wrapper" v-show="second">
      <div v-for="movie in popularMovies" :key="movie.id" class="old">
        <img
          :src="
            'https://themoviedb.org/t/p/w440_and_h660_face' + movie.poster_path
          "
        />
        <p>{{ movie.title }}</p>
      </div>
    </div>
    <div class="wrapper" v-show="!second">
      <div v-for="now in nowPlaying" :key="now.id" class="old">
        <img
          :src="
            'https://themoviedb.org/t/p/w440_and_h660_face' + now.poster_path
          "
        />
        <p>{{ now.name }}</p>
      </div>
    </div>
    <hr />
    <h3>Upcoming</h3>
    <div
      class="button2"
      :class="{ available2: available2, notAvailable2: notAvailable2 }"
    >
      <button
        @click="(third = true), (available2 = true), (notAvailable2 = false)"
        id="movies2"
      >
        Movies
      </button>
      <button
        @click="(third = false), (notAvailable2 = true), (available2 = false)"
        id="tvShows2"
      >
        Tv Shows
      </button>
    </div>
    <div class="wrapper" v-show="third">
      <div v-for="movie in popularMovies" :key="movie.id" class="old">
        <img
          :src="
            'https://themoviedb.org/t/p/w440_and_h660_face' + movie.poster_path
          "
        />
        <p>{{ movie.title }}</p>
      </div>
    </div>
    <div class="wrapper" v-show="!third">
      <div v-for="up in upcoming" :key="up.id" class="old">
        <img
          :src="
            'https://themoviedb.org/t/p/w440_and_h660_face' + up.poster_path
          "
        />
        <p>{{ up.name }}</p>
      </div>
    </div>
    <hr />
    <h3>Top Rated</h3>
    <div
      class="button3"
      :class="{ available3: available3, notAvailable3: notAvailable3 }"
    >
      <button
        @click="(four = true), (available3 = true), (notAvailable3 = false)"
        id="movies3"
      >
        Movies
      </button>
      <button
        @click="(four = false), (notAvailable3 = true), (available3 = false)"
        id="tvShows3"
      >
        Tv Shows
      </button>
    </div>
    <div class="wrapper" v-show="four">
      <div v-for="movie in popularMovies" :key="movie.id" class="old">
        <img
          :src="
            'https://themoviedb.org/t/p/w440_and_h660_face' + movie.poster_path
          "
        />
        <p>{{ movie.title }}</p>
      </div>
    </div>
    <div class="wrapper" v-show="!four">
      <div v-for="top in topRated" :key="top.id" class="old">
        <img
          :src="
            'https://themoviedb.org/t/p/w440_and_h660_face' + top.poster_path
          "
        />
        <p>{{ top.name }}</p>
      </div>
    </div>
    <hr />
  </div>
</template>
<script>
export default {
  data() {
    return {
      popularMovies: [],
      mostPopular: [],
      nowPlaying: [],
      upcoming: [],
      topRated: [],
      first: true,
      second: true,
      third: true,
      four: true,
      available: true,
      notAvailable: false,
      available1: true,
      notAvailable1: false,
      available2: true,
      notAvailable2: false,
      available3: true,
      notAvailable3: false,
    };
  },
  created() {
    fetch(
      "https://api.themoviedb.org/3/movie/popular?api_key=ffebf14b46dcd2b2bb0af17fdfffaa0c"
    )
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        this.popularMovies = data.results;
      })
      .then(
        fetch(
          "https://api.themoviedb.org/3/tv/popular?api_key=ffebf14b46dcd2b2bb0af17fdfffaa0c"
        )
          .then((data) => {
            return data.json();
          })
          .then((data) => {
            this.mostPopular = data.results;
          })
      )
      .then(
        fetch(
          "https://api.themoviedb.org/3/tv/airing_today?api_key=ffebf14b46dcd2b2bb0af17fdfffaa0c"
        )
          .then((data) => {
            return data.json();
          })
          .then((data) => {
            this.nowPlaying = data.results;
          })
      )
      .then(
        fetch(
          "https://api.themoviedb.org/3/tv/on_the_air?api_key=ffebf14b46dcd2b2bb0af17fdfffaa0c"
        )
          .then((data) => {
            return data.json();
          })
          .then((data) => {
            this.upcoming = data.results;
          })
      )
      .then(
        fetch(
          "https://api.themoviedb.org/3/tv/top_rated?api_key=ffebf14b46dcd2b2bb0af17fdfffaa0c"
        )
          .then((data) => {
            return data.json();
          })
          .then((data) => {
            this.topRated = data.results;
          })
      );
  },
};
</script>
<style scoped>
.wrapper {
  height: 480px;
  margin: 17px 0 -17px 0;
  display: flex;
  overflow-x: auto;
  padding: 41px;
  background-color: #f8f0fb;
}

.wrapper img {
  width: 150px;
  height: 225px;
  display: inline-block;
  padding: 10px;
  border-radius: 20px;
}

.wrapper p {
  text-align: center;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 20px;
}

h3 {
  display: inline-block;
  margin: 70px 0 0 0;
  padding: 0 40px 0 0;
}
.old {
  background-color: white;
  border-radius: 10px;
  height: 330px;
  width: 152px;
  margin: 25px 5px;
  border: 1px solid #ccc;
}

.old:hover {
  margin-top: -30px;
  margin-left: 30px;
  margin-right: 30px;
  max-height: 400px;
  width: 170px;
}
.old:hover img {
  width: 170px;
  height: 255px;
}

hr {
  padding: 2px;
}
.button {
  position: absolute;
  height: 30px;
  left: 290px;
  top: 133px;
}
button {
  border: 1px solid #032541;
  border-radius: 30px;
  width: 150px;
  background-color: white;
  margin-left: 7px;
}
.available #movies {
  background-color: #032541;
  color: white;
}
.notAvailable #tvShows {
  background-color: #032541;
  color: white;
}
.button1 {
  position: absolute;
  height: 30px;
  left: 290px;
  top: 750px;
}
.available1 #movies1 {
  background-color: #032541;
  color: white;
}
.notAvailable1 #tvShows1 {
  background-color: #032541;
  color: white;
}
.button2 {
  position: absolute;
  height: 30px;
  left: 290px;
  top: 1375px;
}
.available2 #movies2 {
  background-color: #032541;
  color: white;
}
.notAvailable2 #tvShows2 {
  background-color: #032541;
  color: white;
}
.button3 {
  position: absolute;
  height: 30px;
  left: 290px;
  top: 1992px;
}
.available3 #movies3 {
  background-color: #032541;
  color: white;
}
.notAvailable3 #tvShows3 {
  background-color: #032541;
  color: white;
}
</style>


