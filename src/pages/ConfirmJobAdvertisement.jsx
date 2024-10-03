import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { Card, Button, } from 'semantic-ui-react';
import JobAdvertisementService from '../services/jobAdvertisementService';
import { useHistory} from 'react-router';

export default function ConfirmJobAdvertisement() {
    let { id } = useParams()
    const [unconfirmedjobAdvertisement, setUnconfirmedjobAdvertisement] = useState({});
    let jobAdvertisementService = new JobAdvertisementService();
    let history = useHistory();
    

    useEffect(() => {
        
        jobAdvertisementService.getJobAdvertisementById(id).then((result) => setUnconfirmedjobAdvertisement(result.data.data))
    }, [])

    function handleOnClickConfirm() {

        jobAdvertisementService.setJobAdvertisementConfirmedById(id);
        alert( id+ " Nolu is ilani onaylandi");
    }
    function goBack() {
        history.push('/unconfirmedjobadvertisements');
    }

    return (
        <div>
            <Card.Group>
                <Card fluid>
                    <Card.Content>
                        <Card.Header>{unconfirmedjobAdvertisement?.job?.jobTitle}</Card.Header>
                        <Card.Meta>{unconfirmedjobAdvertisement?.employer?.companyName} </Card.Meta>
                        <Card.Description>
                            Description: {unconfirmedjobAdvertisement.description}<br />
                            Open position: {unconfirmedjobAdvertisement.openPositionAmount}<br />
                            Published at : {unconfirmedjobAdvertisement.publicationDate}<br />
                            Last app. date: {unconfirmedjobAdvertisement.lastApplicationDate}<br />
                        </Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                        <div className="ui two buttons">

                            <Button basic color="green" onClick={handleOnClickConfirm}>
                                Onayla
                            </Button>
                            <Button basic color="red" onClick={goBack} >
                                {/* onClick in C sini küçük yazdýðým için dakikalardýr bütün hisotry metodlarýný taradým! -3.10.2024 */}
                                Onaylanmamis Is Ilanlarina Don
                            </Button>
                        </div>
                    </Card.Content>
                </Card>
            </Card.Group>
        </div>
    )

}