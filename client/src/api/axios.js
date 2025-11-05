import axios from "axios";
const instance = axios.create({
    baseURL: import.meta.VITE_APP_API_URL,
    withCredentials: true,
    timeout: 10000
});

export default instance;
