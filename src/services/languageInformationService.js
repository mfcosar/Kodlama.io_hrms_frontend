import axios from 'axios';

export default class LanguageInformationService {
    getLanguageInformationByCandidateId(candidateId) {
        return axios.get("http://localhost:8080/api/languageInformations/findByCandidate?candidateId=" + candidateId);
    }
}