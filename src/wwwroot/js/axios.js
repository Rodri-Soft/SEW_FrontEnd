import axios from 'axios'
import Cookies from 'js-cookie';

axios.defaults.baseURL = 'https://sewapi-production.up.railway.app/api/v1/';

// axios.defaults.headers.common['Authorization'] = 'Bearer ' + Cookies.get("access_token");