<template>
  <div>
    <div class="acting" v-if="endpointType && endpointType.length">
      <div
        v-for="department in endpointType"
        :key="department.credit_id"
        class="in_acting"
      >
        <i v-if="department.release_date"
          >{{ department.release_date.slice(0, 4) }}
        </i>
        <i v-else> —— </i>
        <i>◯ </i>
        <router-link
          class="sub-link"
          :to="'/' + department.media_type + '/' + department.id"
          ><strong v-if="department.original_title"
            >{{ department.original_title }}
          </strong></router-link
        >
        <router-link
          class="sub-link"
          :to="'/' + department.media_type + '/' + department.id"
          ><strong v-if="department.original_name">{{
            department.original_name
          }}</strong></router-link
        >
        <small v-if="department.job"> ... {{ department.job }}</small>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["endpointType"],
};
</script>

<style scoped>
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
</style>