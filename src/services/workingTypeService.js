import axios from 'axios';
import authHeader from "./auth-header";
export default class WorkingTypeService {
    getWorkingTypes() {
        return axios.get("http://localhost:8080/api/workingtypes/getall", { headers: authHeader(), });
    }
}