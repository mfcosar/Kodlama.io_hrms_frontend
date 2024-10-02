import axios from 'axios';

export default class JobAdvertisementService {
    getJobAdvertisements() {
        return axios.get("http://localhost:8080/api/jobAdvertisements/getall");
    }

     getJobAdvertisementById(id) {
        return axios.get("http://localhost:8080/api/jobAdvertisements/getbyid?id="+ id)
    }
}