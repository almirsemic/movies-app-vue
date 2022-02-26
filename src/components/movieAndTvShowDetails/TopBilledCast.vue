<template>
  <div>
       <div class="wrapper" v-if="actors" >
      <h4>Top Billed Cast</h4>
      
        <div class="actors_and_pictures"  v-for="interest in actors.cast.slice(0, 8)" :key="interest.id" @click="transitionToActorDetails(interest.id)">
        <img v-if="interest.profile_path != null"
          :src="
            'https://themoviedb.org/t/p/w440_and_h660_face' + interest.profile_path
          "
        />
        <img v-if="interest.profile_path == null" src="@/assets/image.png">
        <p>{{ interest.name }} <br /></p>
        <label>{{ interest.character }}</label>
      </div>
      
      <a @click="transitionToFilmActors(actors.id)" v-if="actors.cast.length > 7">View More</a>
    </div>
    <strong>Full Cast & Crew </strong>
    <hr />
  </div>
</template>

<script>
export default {
           props: {
endpointType: {
    type: String
}
    },
data(){
    return{
actors: null
    }
},
methods: {
    transitionToFilmActors(id){
     this.$router.push({ name: 'filmActors', params: { id, type: this.endpointType } })
   },
   transitionToActorDetails(id){
     this.$router.push({ name: 'actorDetails', params: { id } })

   }
},
created() {
    const ApiKey = "ffebf14b46dcd2b2bb0af17fdfffaa0c";

    fetch(
      `https://api.themoviedb.org/3/${this.endpointType}/${this.$route.params.id}/credits?api_key=${ApiKey}`
    )
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        this.actors = data;
      });
}
}
</script>

<style scoped>
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
.wrapper img {
  width: 143px;
  height: 165px;
  display: inline-block;
  padding: 10px;
  border-radius: 20px 20px 0 0;
  margin: -10px 0 0 -10px;
}
.wrapper label {
  text-align: center;
  font-style: normal;
  font-weight: normal;
  width: 120px;
}
.wrapper p {
  text-align: center;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 20px;
}
.actors_and_pictures {
  background-color: white;
  border-radius: 10px;
  height: 280px;
  width: 125px;
  margin: 25px 5px;
  border: 1px solid #ccc;
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
</style>