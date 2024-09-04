import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:5000',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
});

export default axiosInstance;

// import axios from 'axios';

// axios.defaults.baseURL = 'http://127.0.0.1:5000';
// axios.defaults.headers.common['Content-Type'] = 'application/json';

// export default axios;