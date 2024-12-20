import axios from 'axios';
import authHeader from "./auth-header";

export default class ImageService {
    /*getImageByCandidateId(candidateId) {
        return axios.get("http://localhost:8080/api/images/findByCandidateId?candidateId=" + candidateId);
    }*/

    getImageUrlByCandidateId(candidateId) {
        alert("servis candidateId: " + candidateId);
        //alert("authHeader(): " + JSON.stringify(authHeader()) );
        return axios.get("http://localhost:8080/api/images/findByCandidateIdFirst?candidateId=" + candidateId,
            { headers: authHeader() });
        
    }
}