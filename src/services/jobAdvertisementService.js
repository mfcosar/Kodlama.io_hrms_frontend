import axios from 'axios';
import authHeader from "./auth-header";

export default class JobAdvertisementService {
    getJobAdvertisements() {
        return axios.get("http://localhost:8080/api/jobAdvertisements/getall", { headers: authHeader(), });
    }

     getJobAdvertisementById(id) {
         return axios.get("http://localhost:8080/api/jobAdvertisements/getbyid?id=" + id) //whether make here post?
         //return axios.get(`http://localhost:8080/api/jobAdvertisements/getbyid/${id}`);
    }

     getUnconfirmedJobAdvertisements() {
        return axios.get("http://localhost:8080/api/jobAdvertisements/getallunconfirmed");
    }

    setJobAdvertisementConfirmedById(id) {
        return axios.post("http://localhost:8080/api/jobAdvertisements/confirmbyid?jobAdvertisementId=" + id)
            .then(response => console.log(response.data.message));
    }
    addJobAdvertisement(jobAdvertisement){
        return axios.post("http://localhost:8080/api/jobAdvertisements/add", jobAdvertisement, { headers: authHeader(), });
    }
}