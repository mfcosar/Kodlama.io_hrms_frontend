import { Button, } from 'semantic-ui-react';
import JobAdvertisementService from '../services/jobAdvertisementService';
import { toast } from 'react-toastify';

export default function ConfirmJobAdvertisement({ id}) {

    let jobAdvertisementService = new JobAdvertisementService();
    function handleOnClickConfirm() {
        jobAdvertisementService.setJobAdvertisementConfirmedById(id);
        //alert(id + " Nolu is ilani onaylandi");
        toast.success(`${id}  Nolu is ilani onaylandi`) 
    }
  
    return (
        <div className="ui two buttons">
            <Button basic color="green" onClick={handleOnClickConfirm}>
                Onayla
            </Button>
        </div>
    )

}