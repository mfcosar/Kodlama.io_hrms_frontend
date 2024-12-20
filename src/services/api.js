import axios from "axios";
import TokenService from "./token.service";

const instance = axios.create({
    baseURL: "http://localhost:8080/api",
    headers: {
        "Content-Type": "application/json",
    },
});

instance.interceptors.request.use(
    (config) => {
        const token = TokenService.getLocalAccessToken();
        alert("api'deyiz, request'le backend'e giden access token: " + token);
        if (token) {
            config.headers["Authorization"] = 'Bearer ' + token;  // for Spring Boot back-end
            //config.headers["x-access-token"] = token; // for Node.js Express back-end
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

instance.interceptors.response.use(
    (res) => {
        return res;
    },
    async (err) => {
        const originalConfig = err.config;
        alert("api'deyiz, responsedayiz: url " + originalConfig.url);
        if ((originalConfig.url !== "/auth/signin") && err.response) { //&& originalConfig.url !== "/auth/signup/candidate"
            // Access Token was expired
            if (err.response.status === 401 && !originalConfig._retry) {
                originalConfig._retry = true;

                alert(" api'deyiz: status 401 response'dan sonra. RefreshToken: " + TokenService.getLocalRefreshToken());
                try {
                    const rs = await instance.post("/auth/refreshtoken", {
                        refreshToken: TokenService.getLocalRefreshToken(),
                    });
                   
                    const { accessToken } = rs.data;
                    TokenService.updateLocalAccessToken(accessToken);

                    return instance(originalConfig);
                } catch (_error) {
                    return Promise.reject(_error);
                }
            }
        }

        return Promise.reject(err);
    }
);

export default instance;