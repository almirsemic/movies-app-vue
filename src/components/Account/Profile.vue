<template>
  <div>
    <div class="account">
      <div class="data">
        <p>{{ user.username.slice(0, 1).toUpperCase() }}</p>
        <strong>{{ user.username }}</strong>
        <div class="averge">
          <label>0%</label>
          <small
            >Average <br />
            Movie Score</small
          >
          <label>0%</label>
          <small
            >Average <br />
            TV Score</small
          >
        </div>
      </div>
    </div>
    <MovieTvWatchlist></MovieTvWatchlist>
  </div>
</template>
<script>
import MovieTvWatchlist from '../Account/MovieTvWatchlist.vue'
import { mapGetters } from "vuex";
import axios from "axios";
export default {
  components: {
MovieTvWatchlist,
  },
  computed: {
    ...mapGetters(["user"]),
  },
  async created() {
    const session = JSON.parse(localStorage.getItem("session"));
    const account = await axios.get(
      `account?api_key=ffebf14b46dcd2b2bb0af17fdfffaa0c&session_id=${session.data.session_id}`
    );
    localStorage.setItem("user", JSON.stringify(account.data));
  },
};
</script>

<style scoped>
.account {
  height: 350px;
  background-color: #063358;
}
.data p {
  width: 150px;
  height: 150px;
  background-color: #1e4d74;
  text-align: center;
  font-weight: 600;
  font-size: 35px;
  padding: 45px;
  border-radius: 50%;
  border: 3px solid #032541;
  color: white;
}
.data {
  margin: 100px 0 0 150px;
  position: absolute;
  display: inline-flex;
}
.data strong {
  margin: 10px 0 0 30px;
  font-size: 25px;
  color: white;
  font-weight: 400;
}
.averge {
  display: inline-flex;
  margin: 70px 0 0 -165px;
}
.averge small {
  margin-left: 20px;
  padding: 10px;
  color: white;
}
.averge label {
  margin-left: 45px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #1e4d74;
  padding: 14px 0 0 20px;
  border: 2px solid white;
  font-weight: 600;
  color: white;
}

</style>