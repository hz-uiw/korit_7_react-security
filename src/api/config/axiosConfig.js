import axios from "axios";
// 엑시오스 객체를 만듦
export const api = axios.create({
    baseURL: "http://localhost:8080",
    headers: {
        Authorization: !!localStorage.getItem("AccessToken") && `Bearer ${localStorage.getItem("AccessToken")}`,
    }
});