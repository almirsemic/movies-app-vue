import VueRouter from 'vue-router';
import store from './vuex';
import Vue from 'vue';
import Home from './components/Home';
import MostPopularMovies from './components/movies/MostPopularMovies';
import NowPlayingMovies from './components/movies/NowPlayingMovies';
import TopRatedMovies from './components/movies/TopRatedMovies';
import UpcomingMovies from './components/movies/UpcomingMovies';
import AiringTodayTv from './components/tvShows/AiringTodayTv';
import MostPopularTv from './components/tvShows/MostPopularTv';
import OnTv from './components/tvShows/OnTv';
import TopRatedTv from './components/tvShows/TopRatedTv';
import MovieDetails from './components/MovieDetails.vue';
import ReviewsReadMore from './components/ReviewsReadMore.vue';
import ReviewsReadAll from './components/ReviewsReadAll.vue';
import FilmActors from './components/FilmActors.vue';
import TvShowDetails from './components/TvShowDetails.vue';
import Seasons from './components/movieAndTvShowDetails/Seasons';
import Episodes from './components/movieAndTvShowDetails/Episodes';
import ActorDetails from './components/ActorDetails';
import Login from './components/Login.vue';
import Profile from './components/Account/Profile';
import Search from './components/Search.vue';

const routes = [
	{ path: '/', name: 'home', component: Home },
	{ path: '/movie/popular', component: MostPopularMovies },
	{ path: '/movie/now_playing', component: NowPlayingMovies },
	{ path: '/movie/upcoming', component: UpcomingMovies },
	{ path: '/movie/top_rated', component: TopRatedMovies },
	{ path: '/tv/popular', component: MostPopularTv },
	{ path: '/tv/airing_today', component: AiringTodayTv },
	{ path: '/tv/on_tv', component: OnTv },
	{ path: '/tv/top_rated', component: TopRatedTv },
	{ path: '/movie/:id', name: 'movieDetails', component: MovieDetails },
	{ path: '/review/:id', name: 'reviewsReadMore', component: ReviewsReadMore },
	{ path: '/:type/:id/reviews', name: 'reviewsReadAll', component: ReviewsReadAll },
	{ path: '/:type/:id/cast', name: 'filmActors', component: FilmActors },
	{ path: '/tv/:id', name: 'tvShowDetails', component: TvShowDetails },
	{ path: '/tv/:id/seasons', name: 'seasons', component: Seasons },
	{ path: '/tv/:id/seasons/:number', name: 'episodes', component: Episodes },
	{ path: '/person/:id', name: 'actorDetails', component: ActorDetails },
	{ path: '/search', name: 'search', component: Search},
	{
		path: '/login',
		name: 'login',
		component: Login,
		meta: {
			requiresNonAuthenticatedState: true
		}
	},
	{
		path: '/profile',
		component: Profile,
		meta: {
			requiresAuth: true
		}
	}
];

Vue.use(VueRouter);

const router = new VueRouter({
	routes,
	mode: 'history'
});

router.beforeEach((to, from, next) => {
	if (to.matched.some((record) => record.meta.requiresNonAuthenticatedState)) {
		if (store.getters.user) {
			next('/profile');
			return;
		}
	}
	next();
	if (to.matched.some((record) => record.meta.requiresAuth)) {
		if (!store.getters.user) {
			next('/login');
			return;
		}
		next();
	}
});

export default router;
