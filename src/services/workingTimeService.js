import axios from 'axios';
import authHeader from "./auth-header";
export default class WorkingTimeService {
    getWorkingTimes() {
        return axios.get("http://localhost:8080/api/workingtimes/getall", { headers: authHeader(), });
    }
}