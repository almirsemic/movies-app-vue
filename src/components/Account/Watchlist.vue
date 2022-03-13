<template>
  <div>
        <div class="card" v-for="data in dataWatchlist" :key="data.id">
          <img
            :src="`https://themoviedb.org/t/p/w440_and_h660_face/${data.backdrop_path}`"
          />
          <div class="movie_data">
            <p>{{ data.vote_average * 10 }}%</p>
           <div class="text">
                <strong
              >{{data.original_title}} 
              </strong>
              <small>{{data.release_date}}</small>
            <strong>{{data.name}} 
            </strong><br>
            <small>{{ data.first_air_date}}</small>
            <br />
            <label>{{ data.overview | overview }}</label>
           </div><br>
            <div class="icons">
              <a
                ><svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-star"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"
                  />
                </svg> </a
              ><i> Your rating</i>
              <a
                ><svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-heart-fill"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill-rule="evenodd"
                    d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
                  />
                </svg> </a
              ><i> Favorite</i>
              <a
                ><svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-menu-button-wide-fill"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M1.5 0A1.5 1.5 0 0 0 0 1.5v2A1.5 1.5 0 0 0 1.5 5h13A1.5 1.5 0 0 0 16 3.5v-2A1.5 1.5 0 0 0 14.5 0h-13zm1 2h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1 0-1zm9.927.427A.25.25 0 0 1 12.604 2h.792a.25.25 0 0 1 .177.427l-.396.396a.25.25 0 0 1-.354 0l-.396-.396zM0 8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V8zm1 3v2a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2H1zm14-1V8a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v2h14zM2 8.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0 4a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5z"
                  />
                </svg> </a
              ><i> Add to list</i>
              <a
                ><svg
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
                </svg> </a
              ><i> Remove</i>
            </div>
          </div>
        </div>
      </div>
</template>
<script>
export default {
props: ['dataWatchlist'],
filters: {
    overview(value) {
      if (value.length > 200) {
        return value.slice(0, value.indexOf("."));
      } else {
        return value;
      }
    },
  },
}
</script>
<style scoped>
.card img {
  width: 133px;
  height: 199px;
  border-radius: 3px 0 0 3px;
  margin: -1px 0 0 0;
}
.movie_data {
  position: absolute;
  margin: 10px 0 0 160px; 
}
small {
  font-size: 0.8em;
  color: rgb(138, 131, 131);
}
.movie_data p {
  border-radius: 50px;
  border: 4px solid rgb(89, 173, 89);
  background-color: #032541;
  color: white;
  width: 50px;
  height: 50px;
  text-align: center;
  padding: 8px 0;
  position: absolute;
}
.text{
    margin: 0 0 0 60px;
}
.icons a {
  border: 1px solid black;
  margin-left: 15px;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  text-align: center;
}
.icons i {
  margin-left: 20px;
}
.icons {
  display: inline-flex;
}
.movie_data label {
  width: 1050px;
  height: 70px;
}

</style>