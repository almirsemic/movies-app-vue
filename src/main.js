import Vue from 'vue';
import App from './App.vue';
import router from './router';
import './axios';
import store from './vuex';

new Vue({
	router,
	store,
	render: (h) => h(App)
}).$mount('#app');
