import axios from 'axios';

const instance = axios.create({
     baseURL: "https://movieflix-backend-nine.vercel.app/api",
});

export default instance;
