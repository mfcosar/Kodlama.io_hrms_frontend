import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { Card, Button } from 'semantic-ui-react';
import JobAdvertisementService from '../services/jobAdvertisementService';
import { Link } from 'react-router-dom';
import AuthService from '../services/authService';
import { useHistory } from 'react-router-dom';


export default function JobAdvertisementDetail() {
    let { id } = useParams()
    const currentUser = AuthService.getCurrentUser();

    const [jobAdvertisement, setJobAdvertisement] = useState({});
    const history = useHistory();

    useEffect(() => {
        if (
            !currentUser ||
            (!currentUser.roles.includes("ROLE_EMPLOYER") &&
                !currentUser.roles.includes("ROLE_ADMIN"))
        ) {
            history("/unauthorized");
        } else {
            let jobAdvertisementService = new JobAdvertisementService();
            jobAdvertisementService.getJobAdvertisementById(id).then((result) => setJobAdvertisement(result.data.data))
        }
    }, [currentUser.id])


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
                            Min. Salary: {jobAdvertisement.minSalary}<br />
                            Max. Salary: {jobAdvertisement.maxSalary}<br />
                            Active: {jobAdvertisement?.active?.toString()}<br />
                            Confirmed: {jobAdvertisement?.confirmed?.toString()}<br />
                        </Card.Description>
                    </Card.Content>
                    {/*<Card.Content extra>
                        <div className="ui two buttons">
                            <Button basic color="green">
                                Approve
                            </Button>
                            <Button basic color="red">
                                Decline
                            </Button>
                        </div>
                    </Card.Content>
                    */}
                </Card>
            </Card.Group>
        </div>
    )
}