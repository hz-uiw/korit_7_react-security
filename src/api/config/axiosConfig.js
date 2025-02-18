import axios from "axios";
// 엑시오스 객체를 만듦
export const api = axios.create({
    baseURL: "http://localhost:8080",
    headers: {
        Authorization: !!localStorage.getItem("AccessToken") && `Bearer ${localStorage.getItem("AccessToken")}`,
    }
});

api.interceptors.request.use(config => {
    const token = localStorage.getItem("AccessToken");
    if(!!token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, error => Promise.reject(error));

export const setAccessToken = (token) => {
    if (!!token) {
        localStorage.setItem("AccessToken", token);
    } else {
        localStorage.removeItem("AccessToken");
    }
};