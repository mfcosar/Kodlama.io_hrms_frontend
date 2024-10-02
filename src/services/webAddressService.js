import axios from 'axios';

export default class WebAddressService {
    getWebAddressByCandidateId(candidateId) {
        return axios.get("http://localhost:8080/api/webAddresses/findByCandidateId?candidateId=" + candidateId);
    }
}