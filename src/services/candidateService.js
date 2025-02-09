import axios from 'axios';
import authHeader from "./auth-header";

export default class CandidateService {
    getCandidates() {
        return axios.get("http://localhost:8080/api/candidates/getall")
    }

    getCandidateById(id) { //
        alert("candidate retrieved from db: " + id);
        return axios.get("http://localhost:8080/api/candidates/" + `getcandidatebyid/${id}`, {
            headers: authHeader(),
        });
    };

    addCandidate(candidate) {
        return axios.post("http://localhost:8080/api/candidates/add", candidate);
    }

    updateCandidate(values) {
        alert("candidate sent to db: " + values.id);
        return axios.put("http://localhost:8080/api/candidates/" + `updatecandidatebyid/${values.id}`, values, {
            headers: authHeader(),
        });
    };
}