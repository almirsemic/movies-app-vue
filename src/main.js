import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import VueRouter from "vue-router";
import Routes from "./routes";


Vue.use(VueRouter);

const router = new VueRouter({
  routes: Routes,
  mode: "history"
})

new Vue({
  router: router,
  store,
  render: (h) => h(App),
}).$mount("#app");
