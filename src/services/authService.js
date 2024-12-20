import api from "./api";
import axios from 'axios';

import TokenService from "./token.service";
import authHeader from "./auth-header";
//Hooks implementation


const registerUser = (username, email, password) => {
    return api.post("/auth/signup/user", { username, email, password });
};

const registerCandidate = (username, email, password, firstName, lastName, tcIdentityNumber, birthYear) => {
    alert("user name : " + username);
    return api.post("/auth/signup/candidate", {
        username: username, email, password, firstName, lastName, tcIdentityNumber, birthYear
    });
};

const login = (username, password) => {
    return api
        .post("/auth/signin", {
            username,
            password
        })
        .then((response) => {
            alert("login'deyiz: backend'den response geldi");
            if (response.data.accessToken) {
                TokenService.setUser(response.data);
                alert("login'deyiz: backend'den accessToken geldi: " + response.data.accessToken);
            }
            return response.data;
        });
};

const logout = () => {
    //Network exception dedi. Backend'de full authorization gerek diyor
    
    // Optionally send a request to the server to invalidate the token
    fetch('http://localhost:8080/api/auth/signout', {  // api.post("/auth/signout", {
    method: 'POST',
        headers: {
            'Authorization': `Bearer ${TokenService.getLocalAccessToken() }`, // include the JWT token if needed
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            message: "User logging out"
        })
    })
        .then(response => response.json()) //write response to send a refreshToken request if accessToken expired...otherwise the request isnt authorized in backend
        .then(data => {
            console.log('Logout successful:', data);
        })
        .catch((error) => {
            console.error('Logout error:', error);
        });
    alert("Logout successful");
    //return api.post("/auth/signout");
    

    // Remove JWT from local storage or cookies
    //localStorage.removeItem('token'); // or document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    TokenService.removeUser();
};

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("user"));
};

const AuthService = {
    registerUser,
    registerCandidate,
    login,
    logout,
    getCurrentUser,
   
};

export default AuthService;

/*
class AuthService {
    login(username, password) {
        return api
            .post("/auth/signin", {
                username,
                password
            })
            .then(response => {
                if (response.data.accessToken) {
                    TokenService.setUser(response.data);
                }

                return response.data;
            });
    }

    logout() {
        TokenService.removeUser();
    }

    register(username, email, password) {
        return api.post("/auth/signup", {
            username,
            email,
            password
        });
    }

    getCurrentUser() {
        return TokenService.getUser();
    }
}

export default new AuthService();
*/


/*import axios from "axios";

const API_URL = "http://localhost:8080/api/auth/";

const register = (username, email, password) => {
    return axios.post(API_URL + "signup", {
        username,
        email,
        password,
    });
};

const login = (username, password) => {
    return axios
        .post(API_URL + "signin", {
            username,
            password,
        })
        .then((response) => {
            if (response.data.accessToken) {
                localStorage.setItem("user", JSON.stringify(response.data));
                alert("User logged in: " + JSON.stringify(response.data));
            }

            return response.data;
        });
};

const logout = () => {
    localStorage.removeItem("user");
};

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("user"));
};

const AuthService = {
    register,
    login,
    logout,
    getCurrentUser,
};

export default AuthService;*/