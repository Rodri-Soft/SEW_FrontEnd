import axios from 'axios'
import Cookies from 'js-cookie';

axios.defaults.baseURL = 'http://localhost:3000/api/v1/';

// axios.defaults.headers.common['Authorization'] = 'Bearer ' + Cookies.get("access_token");