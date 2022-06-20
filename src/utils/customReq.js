import axios from 'axios';

const instance = axios.create({
     baseURL: "https://movieflix-backend-server.herokuapp.com/api",
});

export default instance;