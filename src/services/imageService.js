import axios from 'axios';

export default class ImageService {
    getImageByCandidateId(candidateId) {
        return axios.get("http://localhost:8080/api/images/findByCandidateId?candidateId=" + candidateId);
    }
}