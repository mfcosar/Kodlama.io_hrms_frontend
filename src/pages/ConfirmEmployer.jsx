import { Button, } from 'semantic-ui-react';
import { toast } from 'react-toastify';
import { useEffect } from "react";
import { useHistory } from 'react-router-dom';
import AuthService from '../services/authService';
import EmployerService from '../services/employerService';

export default function ConfirmEmployer({ employerId, employeeId}) {

    const currentUser = AuthService.getCurrentUser();
    const employerService = new EmployerService();
    const history = useHistory();
    //let employerId = id;

    useEffect(() => {
        if (!currentUser || (!currentUser.roles.includes("ROLE_ADMIN"))) {
            history("/unauthorized");
        } 
    }, [currentUser.id]);

    function handleOnClickConfirm() {
        alert("role admin: " + currentUser.roles.includes("ROLE_ADMIN") + "employerId : " + employerId + "employeeId : " + employeeId);
        employerService.setEmployerEmployeeConfirmedById(employerId, employeeId);
        //alert(id + " Nolu is ilani onaylandi");
        toast.success(`${employerId}  Numbered employer is confirmed`) 
    }
  
    return (
        <div className="ui two buttons">
            <Button basic color="green" onClick={handleOnClickConfirm}>
                Confirm
            </Button>
        </div>
    )

}