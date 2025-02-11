import axios from 'axios';
import authHeader from "./auth-header";
export default class CityService {
    getCities() {
        return axios.get("http://localhost:8080/api/cities/getall", { headers: authHeader(), });
    }

    addCity(city) {
        return axios.post("http://localhost:8080/api/cities/add", city, { headers: authHeader(), });
    }
}