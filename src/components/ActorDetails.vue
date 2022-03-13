<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col-md-3">
          <img
            class="profile_picture"
            v-if="actors && actors.profile_path"
            :src="
              'https://themoviedb.org/t/p/w300_and_h450_face' +
              actors.profile_path
            "
          />
          <img
            v-if="actors && !actors.profile_path"
            src="@/assets/unisex.jpg"
            class="profile_picture"
          />
          <div class="personal_info">
            <strong>Personal Info</strong><br /><br />
            <p>Know For</p>
            <small v-if="actors && actors.known_for_department">{{
              actors.known_for_department
            }}</small>
            <small v-else> - </small>
            <p>Know Credits</p>
            <small v-if="casts">{{
              casts.length +
              departmentCreator.length +
              departmentCrew.length +
              departmentDirecting.length +
              departmentProduction.length +
              departmentWriting.length
            }}</small>
            <small v-else> - </small>
            <p>Gender</p>
            <small v-if="actors && actors.gender">{{
              actors.gender | gender
            }}</small>
            <small v-else> - </small>
            <p>Birthday</p>
            <small v-if="actors && actors.birthday">{{
              actors.birthday
            }}</small>
            <small v-else> - </small>
            <p>Place of Birth</p>
            <small v-if="actors && actors.place_of_birth">{{
              actors.place_of_birth
            }}</small>
            <small v-else> - </small>
            <p>Also Known As</p>
            <div v-if="actors && actors.also_known_as">
              <small v-for="also in actors.also_known_as" :key="also"
                >{{ also }} <br
              /></small>
            </div>
            <small v-if="actors && actors.also_known_as.length == 0">
              - <br
            /></small>
          </div>
        </div>
        <div class="col-md-9">
          <div class="biography">
            <h3 v-if="actors && actors.name">{{ actors.name }}</h3>
            <br />
            <strong>Biography</strong><br /><br />
            <i v-if="actors && actors.biography">{{ actors.biography }}</i>
            <i v-if="actors && !actors.biography"
              >We don't have a biography for {{ actors.name }}.</i
            >
            <br /><br /><br />
            <strong v-if="images && images.length > 0">Known For</strong>
          </div>
          <div class="wrapper">
            <div class="pictures" v-for="image in images" :key="image.id">
              <router-link :to="'/' + image.media_type + '/' + image.id"
                ><img
                  :src="
                    'https://themoviedb.org/t/p/w130_and_h195_face' +
                    image.poster_path
                  "
              /></router-link>
              <router-link
                class="sub-link"
                :to="'/' + image.media_type + '/' + image.id"
                ><i>{{ image.original_title }}</i></router-link
              >
              <router-link
                class="sub-link"
                :to="'/' + image.media_type + '/' + image.id"
                ><i>{{ image.name }}</i></router-link
              >
            </div>
          </div>

          <div class="cast">
            <h3 v-if="casts && casts.length > 0">Acting</h3>
            <div class="acting" v-if="casts && casts.length > 0">
              <div
                v-for="cast in casts"
                :key="cast.credit_id"
                class="in_acting"
              >
                <i v-if="cast.release_date"
                  >{{ cast.release_date.slice(0, 4) }}
                </i>
                <i v-else> —— </i>
                <i>◯ </i>
                <router-link
                  class="sub-link"
                  :to="'/' + cast.media_type + '/' + cast.id"
                  ><strong v-if="cast.original_title"
                    >{{ cast.original_title }}
                  </strong></router-link
                >
                <router-link
                  class="sub-link"
                  :to="'/' + cast.media_type + '/' + cast.id"
                  ><strong v-if="cast.original_name">{{
                    cast.original_name
                  }}</strong></router-link
                >
                <small v-if="cast.character"> as {{ cast.character }}</small>
              </div>
            </div>
            <h3 v-if="departmentProduction && departmentProduction.length">
              Production
            </h3>
            <Department :endpointType="departmentProduction"></Department>
            <h3 v-if="departmentCrew && departmentCrew.length">Crew</h3>
            <Department :endpointType="departmentCrew"></Department>
            <h3 v-if="departmentDirecting && departmentDirecting.length">
              Directing
            </h3>
            <Department :endpointType="departmentDirecting"></Department>
            <h3 v-if="departmentWriting && departmentWriting.length">
              Writing
            </h3>
            <Department :endpointType="departmentWriting"></Department>
            <h3 v-if="departmentCreator && departmentCreator.length">
              Creator
            </h3>
            <Department :endpointType="departmentCreator"></Department>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Department from "../components/Department.vue";
import axios from "axios";
export default {
  components: {
    Department,
  },
  data() {
    return {
      actors: null,
      images: [],
      casts: null,
      departmentDirecting: [],
      departmentCrew: [],
      departmentProduction: [],
      departmentWriting: [],
      departmentCreator: [],
    };
  },

  async created() {
    const ApiKey = "ffebf14b46dcd2b2bb0af17fdfffaa0c";

    const allActors = await axios.get(
      `person/${this.$route.params.id}?api_key=${ApiKey}`
    );
    this.actors = allActors.data;
    const allCasts = await axios.get(
      `person/${this.$route.params.id}/combined_credits?api_key=${ApiKey}`
    );
    this.casts = allCasts.data.cast;
    function clone(obj) {
      for (let i = 0; i < obj.length; i++) {
        if (obj[i].first_air_date || obj[i].first_air_date == "") {
          Object.defineProperty(
            obj[i],
            "release_date",
            Object.getOwnPropertyDescriptor(obj[i], "first_air_date")
          );
          delete obj[i]["first_air_date"];
        }
      }
      obj.sort((a, b) => {
        return (
          (new Date(b.release_date).getTime() || +Infinity) -
          (new Date(a.release_date).getTime() || +Infinity)
        );
      });
    }
    clone(this.casts);
    for (let i = 0; i < allCasts.data.crew.length; i++) {
      if (allCasts.data.crew[i].department == "Directing") {
        this.departmentDirecting.push(allCasts.data.crew[i]);
      } else if (allCasts.data.crew[i].department == "Crew") {
        this.departmentCrew.push(allCasts.data.crew[i]);
      } else if (allCasts.data.crew[i].department == "Production") {
        this.departmentProduction.push(allCasts.data.crew[i]);
      } else if (allCasts.data.crew[i].department == "Writing") {
        this.departmentWriting.push(allCasts.data.crew[i]);
      } else if (allCasts.data.crew[i].department == "Creator") {
        this.departmentCreator.push(allCasts.data.crew[i]);
      }
    }
    clone(this.departmentDirecting);
    clone(this.departmentCrew);
    clone(this.departmentProduction);
    clone(this.departmentWriting);
    clone(this.departmentCreator);

    for (let j = 0; j < allCasts.data.cast.length; j++) {
      if (allCasts.data.cast[j].vote_count > 3000) {
        this.images.push(allCasts.data.cast[j]);
      }
    }

    const uniqueIds = [];

    this.images = this.images.filter((element) => {
      const isDuplicate = uniqueIds.includes(element.id);

      if (!isDuplicate) {
        uniqueIds.push(element.id);
        return true;
      }
    });
  },
  filters: {
    gender(value) {
      if (value == 2) {
        return "Male";
      } else if (value == 1) {
        return "Female";
      } else {
        return " - ";
      }
    },
  },
};
</script>

<style scoped>
.col-md-3 .profile_picture {
  border-radius: 10px;
  margin: 80px 0 0 0;
  width: 300px;
  height: 450px;
}

.personal_info p {
  font-weight: 600;
}
.personal_info strong {
  font-weight: 700;
  font-size: 22px;
}
.biography {
  margin: 80px 0 0 0;
}
.biography h3 {
  font-weight: 700;
}
.wrapper {
  display: flex;
  overflow-x: auto;
  text-align: center;
}
.wrapper img {
  margin: 0 5px 0 0;
  padding: 5px 0;
  border-radius: 10px;
}
.acting {
  border: 1px solid silver;
  box-shadow: 0 2px 8px rgb(0 0 0 / 10%);
  margin: 40px 0;
  width: 888px;
}
.in_acting {
  margin: 20px 0 20px 20px;
}
.acting strong:hover {
  color: rgb(91, 91, 231);
}
.sub-link {
  text-decoration: none !important;
  color: black;
}

.cast {
  margin: 40px 0;
}
.cast h3 {
  font-weight: 600;
  font-size: 1.3em;
  margin: 0 0 -20px 0;
}
.pictures {
  max-width: 150px;
}

.wrapper i:hover {
  color: rgb(91, 91, 231);
}
</style>