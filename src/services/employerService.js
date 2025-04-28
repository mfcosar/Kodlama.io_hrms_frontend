import axios from 'axios';
import authHeader from "./auth-header";

export default class EmployerService {


    getEmployers() {
        return axios.get("http://localhost:8080/api/employers/getall");
    };

    getEmployerById(id) {
        alert("employer retrieved from db: " + id);
        return axios.get(`http://localhost:8080/api/employers/getemployerbyid/${id}`, {
            headers: authHeader(),
        });
        // api.post'a girme, axios üzerinden datayý al

        //return axios.get("http://localhost:8080/api/employers/" + `getemployerbyid/${employerId}`, {headers: authHeader()});
        //return api.post("/employers/getemployerbyid?employerId=" + employerId);
        //return api.post(`/employers/getemployerbyid/${employerId}`);   // api.post("/employers/getemployerbyid", employerId); 
            /*.then((response) => {
                alert("employer service'deyiz: backend'den response geldi");
                return response.data
            });*/

        //return axios.get("http://localhost:8080/api/employers/getemployerbyid?employerId=" + employerId);
        //return axios.get("http://localhost:8080/api/jobAdvertisements/getbyid?id=" + id)

    };

    getUnconfirmedEmployers() {
        return axios.get("http://localhost:8080/api/employers/getallunconfirmed", { headers: authHeader(), });
    }

    setEmployerEmployeeConfirmedById(employerId, employeeId) {
        //alert("axios'tayiz, employerId : " + employerId + JSON.stringify(authHeader()));
        return axios.get(`http://localhost:8080/api/verifications/employeeConfirmEmployer?employerId=${employerId}&employeeId=${employeeId}`,
            { headers: authHeader(), });
    }

    updateEmployer(values) {
        alert("employer sent to db: " + values.id);
        return axios.put(`http://localhost:8080/api/employers/updateemployerbyid/${values.id}`, values, {
            headers: authHeader(), });
    };
}