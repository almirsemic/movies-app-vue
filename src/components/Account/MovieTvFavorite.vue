<template>
  <div>
    <WatchlistAndFavorite
      :watchlist="watchlist"
      :endpointType="endpointType"
      :type="'Favorites'"
    ></WatchlistAndFavorite>
  </div>
</template>
<script>
import WatchlistAndFavorite from "./WatchlistAndFavorite.vue";
export default {
  props: ["watchlist", "endpointType"],
  components: {
    WatchlistAndFavorite,
  },
};
</script>