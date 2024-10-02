import axios from 'axios';

export default class EducationInformationService {
    getEducationInformationByCandidateId(candidateId) {
        return axios.get("http://localhost:8080/api/educationInformations/findByCandidateId?candidateId=" + candidateId);
    }
}