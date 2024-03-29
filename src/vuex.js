import Vuex from 'vuex';
import Vue from 'vue';

Vue.use(Vuex);


const state = {
    user: JSON.parse(localStorage.getItem("user"))
};


const store = new Vuex.Store({
    state,
    getters: {
     user: (state) => {
         return state.user
     }
    },
    actions: {
        user(context, user){
            context.commit('user', user)
        }
    },
    mutations: {
        user(state, user){
            state.user = user
        }
    }
});

export default store;