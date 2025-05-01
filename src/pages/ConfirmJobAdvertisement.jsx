import { Button, } from 'semantic-ui-react';
import JobAdvertisementService from '../services/jobAdvertisementService';
import { toast } from 'react-toastify';

export default function ConfirmJobAdvertisement({ jobAdvertisementId, employeeId }) {

    let jobAdvertisementService = new JobAdvertisementService();
    function handleOnClickConfirm() {
        jobAdvertisementService.setJobAdvertisementConfirmedById(jobAdvertisementId, employeeId);
        //alert(id + " Nolu is ilani onaylandi");
        toast.success(`Id : ${jobAdvertisementId}  Job Advertisement confirmation is completed!`) 
    }
  
    return (
        <div className="ui two buttons">
            <Button basic color="green" onClick={handleOnClickConfirm}>
                Onayla
            </Button>
        </div>
    )

}