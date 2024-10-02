import axios from 'axios';

export default class WorkExperienceService {
    getWorkExperienceByCandidateId(candidateId) {
        return axios.get("http://localhost:8080/api/workExperiences/findByCandidateId?candidateId=" + candidateId);
    }
}