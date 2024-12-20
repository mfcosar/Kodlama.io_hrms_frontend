import axios from 'axios';

export default class JobService {
    getJobs() {
        return axios.get("http://localhost:8080/api/jobs/getall");
    }

    addJob(job) {
        return axios.post("http://localhost:8080/api/jobs/add", job);
    }
}
