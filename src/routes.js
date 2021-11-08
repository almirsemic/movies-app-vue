
import people from "./components/people.vue";
import overview from "./components/overview.vue";
import casts from "./components/casts.vue";
import reviews from "./components/reviews.vue";
 import seasions from "./components/seasions.vue";


export default [
    { path: '/people', component: people},
    { path: '/overview', component: overview},
    { path: '/casts', component: casts},
    { path: '/reviews', component: reviews},
    { path: '/seasions', component: seasions},
]