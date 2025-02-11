import axios from 'axios';
import authHeader from "./auth-header";
export default class JobService {
    getJobs() {
        return axios.get("http://localhost:8080/api/jobs/getall", { headers: authHeader(), });
    }

    addJob(job) {
        return axios.post("http://localhost:8080/api/jobs/add", job, { headers: authHeader(), });
    }
}
