//import axios from "axios";
//import authHeader from "./auth-header";
import api from "./api";

const getPublicContent = () => {
    return api.get("/test/all");
};

const getUserBoard = () => {
    return api.get("/test/user");
};

const getModeratorBoard = () => {
    return api.get("/test/mod");
};

const getAdminBoard = () => {
    return api.get("/test/admin");
};
const getCandidateBoard = () => {
    return api.get("/test/candidate");
};
const getEmployerBoard = () => {
    return api.get("/test/employer");
};

const UserService = {
    getPublicContent,
    getUserBoard,
    getModeratorBoard,
    getAdminBoard,
    getCandidateBoard,
    getEmployerBoard
};

export default UserService;

/*
    const getPublicContent = () => {
        return api.get(API_URL + "all"); //axios.get() idi
    };
    
    const getUserBoard = () => {
        return api.get(API_URL + "user", { headers: authHeader() });
    };
    
    const getModeratorBoard = () => {
        return api.get(API_URL + "mod", { headers: authHeader() });
    };
    
    const getAdminBoard = () => {
        return api.get(API_URL + "admin", { headers: authHeader() });
    };
    
    const getCandidateBoard = () => {
        return api.get(API_URL + "candidate", { headers: authHeader() });
    };
*/