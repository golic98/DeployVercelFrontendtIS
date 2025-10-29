import axios from "axios";
const instance = axios.create({
    baseURL: 'https://service-project-theta.vercel.app/api',
    withCredentials: true,
    timeout: 10000
});

export default instance;