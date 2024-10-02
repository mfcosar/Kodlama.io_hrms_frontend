import axios from 'axios';

export default class CoverLetterService {
    getCoverLetterByCandidateId(candidateId) {
        return axios.get("http://localhost:8080/api/coverLetters/findByCandidateId?candidateId=" + candidateId);
    }
}