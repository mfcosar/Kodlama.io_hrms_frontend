import axios from 'axios';

export default class JobAdvertisementService {
    getJobAdvertisements() {
        return axios.get("http://localhost:8080/api/jobAdvertisements/getall");
    }

     getJobAdvertisementById(id) {
        return axios.get("http://localhost:8080/api/jobAdvertisements/getbyid?id="+ id)
    }

     getUnconfirmedJobAdvertisements() {
        return axios.get("http://localhost:8080/api/jobAdvertisements/getallunconfirmed");
    }

    setJobAdvertisementConfirmedById(id) {
        return axios.post("http://localhost:8080/api/jobAdvertisements/confirmbyid?jobAdvertisementId=" + id)
            .then(response => console.log(response.data.message));
    }
}