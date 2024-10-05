import { Button, } from 'semantic-ui-react';
import JobAdvertisementService from '../services/jobAdvertisementService';

export default function ConfirmJobAdvertisement({ id, handleConfirm }) {

    let jobAdvertisementService = new JobAdvertisementService();
    function handleOnClickConfirm() {
        jobAdvertisementService.setJobAdvertisementConfirmedById(id);
        alert(id + " Nolu is ilani onaylandi");
        handleConfirm();
    }
  
    return (
        <div className="ui two buttons">
            <Button basic color="green" onClick={handleOnClickConfirm}>
                Onayla
            </Button>
        </div>
    )

}