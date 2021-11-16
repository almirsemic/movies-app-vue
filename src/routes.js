import home from './components/home';
import movieMostPopular from "./components/movies/movieMostPopular"
import movieNowPlaying from "./components/movies/movieNowPlaying"
import movieTopRated from "./components/movies/movieTopRated"
import movieUpcoming from "./components/movies/movieUpcoming"
import tvAiringToday from "./components/tvShows/tvAiringToday"
import tvMostPopular from "./components/tvShows/tvMostPopular"
import tvOnTv from "./components/tvShows/tvOnTv"
import tvTopRated from "./components/tvShows/tvTopRated"




export default [
{ path: '/', component: home},
{ path: '/movie/popular', component: movieMostPopular},
{ path: '/movie/now_playing', component: movieNowPlaying},
{ path: '/movie/upcoming', component: movieUpcoming},
{ path: '/movie/top_rated', component: movieTopRated},
{ path: '/tv/popular', component: tvMostPopular},
{ path: '/tv/airing_today', component: tvAiringToday},
{ path: '/tv/on_tv', component: tvOnTv},
{ path: '/tv/top_rated', component: tvTopRated},
]