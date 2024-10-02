import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { Card, Button, } from 'semantic-ui-react';
import JobAdvertisementService from '../services/jobAdvertisementService';


export default function JobAdvertisementDetail() {
    let { id } = useParams()

    const [jobAdvertisement, setJobAdvertisement] = useState({});

    useEffect(() => {
        let jobAdvertisementService = new JobAdvertisementService();
        jobAdvertisementService.getJobAdvertisementById(id).then((result) => setJobAdvertisement(result.data.data))
    }, [])

    return (
        <div> 
            <Card.Group>
                <Card fluid>
                    <Card.Content>
                        <Card.Header>{jobAdvertisement?.job?.jobTitle}</Card.Header>
                        <Card.Meta>{jobAdvertisement?.employer?.companyName} </Card.Meta>
                        <Card.Description>
                            Description: {jobAdvertisement.description}<br />
                            Open position: {jobAdvertisement.openPositionAmount}<br />
                            Published at : {jobAdvertisement.publicationDate}<br />
                            Last app. date: {jobAdvertisement.lastApplicationDate}<br />
                        </Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                        <div className="ui two buttons">
                            <Button basic color="green">
                                Approve
                            </Button>
                            <Button basic color="red">
                                Decline
                            </Button>
                        </div>
                    </Card.Content>
                </Card>
            </Card.Group>
        </div>
    )
}