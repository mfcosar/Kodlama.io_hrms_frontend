import axios from 'axios';
import authHeader from "./auth-header";

export default class EmployeeService {
    getEmployees() {
        return axios.get("http://localhost:8080/api/employees/getall");
    }

    getEmployeeById(id) {
        alert("employee retrieved from db: " + id);
        return axios.get("http://localhost:8080/api/employees/" + `getemployeebyid/${id}`, {
            headers: authHeader(),
        });
    };
    updateEmployee(values) {
        alert("employee sent to db: " + values.id);
        return axios.put("http://localhost:8080/api/employees/" + `updateemployeebyid/${values.id}`, values, {
            headers: authHeader(),
        });
    };
}