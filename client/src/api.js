import axios from 'axios';

const api = axios.create({
    baseURL:"https://watchtube-sepia.vercel.app/api/v1"
});

export default api;