import axios from "axios";
const instance = axios.create({
    baseURL: 'https://deploy-vercel-backend-is.vercel.app/api',
    withCredentials: true,
    timeout: 10000
});

export default instance;