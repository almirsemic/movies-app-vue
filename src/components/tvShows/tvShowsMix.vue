<template>
  <div>
    <div class="wrapper">
      <div v-for="tv in tvShows" :key="tv.id" class="old">
        <img
          :src="
            'https://themoviedb.org/t/p/w440_and_h660_face' + tv.poster_path
          "
        />
        <p>{{ tv.name }}</p>
      </div>
    </div>
    <button>Load More</button>
  </div>
</template>

<script>
export default {
    props: {
        tvShowsEndpoint:{
            type: String
        }
    },
  data() {
    return {
      tvShows: [],
    };
  },
  created() {
    fetch(
      `https://api.themoviedb.org/3/tv/${this.tvShowsEndpoint}?api_key=ffebf14b46dcd2b2bb0af17fdfffaa0c`
    )
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        this.tvShows = data.results;
      });
  },
};
</script>

<style scoped>
.wrapper {
  margin: 100px 50px 0 330px;
  display: table;
  background-color: #f8f0fb;

}

.wrapper img {
  width: 200px;
  height: 325px;

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
.old {
  background-color: white;
  border-radius: 10px;
  height: 430px;
  width: 200px;
  border: 1px solid #ccc;
  display: block;
  float: right;
  margin: 20px 10px;
}
.old:hover{ 
  background-color: #f8f0fb;
  border: 1px solid #f8f0fb;
}

button{
  width: 1080px;
  margin: 0 0 7px 360px;
  text-align: center;
  border-radius: 10px;
  border: 1px solid #01B4E4;
  background-color: #01B4E4;
  color: white;
  font-size: 20px;
}
</style>