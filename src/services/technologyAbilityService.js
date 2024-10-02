import axios from 'axios';

export default class TechnologyAbilityService {
    getTechnologyAbilityByCandidateId(candidateId) {
        return axios.get("http://localhost:8080/api/technologyAbilities/findByCandidateId?candidateId=" + candidateId);
    }
}