import axios from 'axios';
import router from './router';

axios.defaults.baseURL = 'https://api.themoviedb.org/3/';

axios.defaults.headers.common['Authorization'] = localStorage.getItem('session');

axios.interceptors.response.use(
	(response) => {
		return response;
	},
	(error) => {
		if (error.response.status == 401) {
			localStorage.clear();
			router.push('/login').catch(err => {
        if (
          err.name !== 'NavigationDuplicated' &&
          !err.message.includes('Avoided redundant navigation to current location')
        ) {
          console.log(err);
        }
      });   
		}
		return Promise.reject(error);
	}
);