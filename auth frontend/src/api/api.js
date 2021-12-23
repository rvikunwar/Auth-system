import axios from 'axios';

export const BASE_URL = import.meta.env.VITE_HOST_URL;

const authAxios = axios.create({
    baseURL: BASE_URL,
});

console.log(BASE_URL,"ss", import.meta.env)

const responseBody = (response) => response.data;

authAxios.interceptors.request.use(
    (config) => {
        return config;
    },
    
    (error) => {
        return Promise.reject(error);
    }
);


const requests = {
  get: (url) => authAxios.get(url).then(responseBody),
  post: (url, body) => authAxios.post(url, body).then(responseBody),
  put: (url, body) => authAxios.put(url, body).then(responseBody),
  del: (url) => authAxios.delete(url).then(responseBody),
};


// THis will contain all the endpoints of the resources
export const endPoints = {
    getJWTToken: 'auth/api/token/',
    refreshJWTToken: 'api/token/refresh/',
    register: 'auth/signup/'
}


//API
export const AuthAPI = {
    //for login and getting JWT token from backend using correct credentials
     login: (body) =>
        requests.post(`${BASE_URL}/${endPoints.getJWTToken}`, body),

    //for refreshing jwt token
    refreshToken: (token) =>
        requests.post(`${BASE_URL}/${endPoints.refreshJWTToken}`, token),
    
    //for registering new user
    register: (body) =>
        requests.post(`${BASE_URL}/${endPoints.register}`, body),
    
}