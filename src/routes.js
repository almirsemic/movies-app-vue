import Home from './components/Home';
import MostPopularMovies from "./components/movies/MostPopularMovies"
import NowPlayingMovies from "./components/movies/NowPlayingMovies"
import TopRatedMovies from "./components/movies/TopRatedMovies"
import UpcomingMovies from "./components/movies/UpcomingMovies"
import AiringTodayTv from "./components/tvShows/AiringTodayTv"
import MostPopularTv from "./components/tvShows/MostPopularTv"
import OnTv from "./components/tvShows/OnTv"
import TopRatedTv from "./components/tvShows/TopRatedTv"
import MovieDetails from "./components/MovieDetails.vue"
import reviewsReadMore from "./components/reviewsReadMore.vue"
import reviewsReadAll from "./components/reviewsReadAll.vue"
import filmActors from "./components/filmActors.vue"



export default [
{ path: '/', component: Home},
{ path: '/movie/popular', component: MostPopularMovies},
{ path: '/movie/now_playing', component: NowPlayingMovies},
{ path: '/movie/upcoming', component: UpcomingMovies},
{ path: '/movie/top_rated', component: TopRatedMovies},
{ path: '/tv/popular', component: MostPopularTv},
{ path: '/tv/airing_today', component: AiringTodayTv},
{ path: '/tv/on_tv', component: OnTv},
{ path: '/tv/top_rated', component: TopRatedTv},
{ path: '/movie/:id', name: 'movieDetails', component: MovieDetails},
{path: '/review/:id', name: 'reviewsReadMore', component: reviewsReadMore}, 
{path: '/movie/:id/reviews', name: 'reviewsReadAll', component: reviewsReadAll }, 
{ path: '/movie/:id/cast', name: 'filmActors', component: filmActors}, 
]