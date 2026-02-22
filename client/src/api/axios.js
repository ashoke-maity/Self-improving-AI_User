import axios from "axios";

const UserAPI = axios.create({
    baseURL:import.meta.env.VITE_USER_API_URL,
    withCredentials: true
});

export default UserAPI;