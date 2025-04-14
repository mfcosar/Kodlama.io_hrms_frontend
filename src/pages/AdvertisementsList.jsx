import React from 'react';
import { useState, useEffect } from 'react';
import { TableRow, TableHeaderCell, TableHeader, TableFooter, TableCell, TableBody, MenuItem, Icon, Menu, Table,} from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import { useParams, } from 'react-router';
import { useHistory } from 'react-router-dom';
import AuthService from '../services/authService';
import JobAdvertisementService from '../services/jobAdvertisementService';
export default function AdvertisementsList() {

    const currentUser = AuthService.getCurrentUser();
    const [jobAdvertisements, setJobAdvertisements] = useState([]);
    let { employerId } = useParams();
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
            jobAdvertisementService.getJobAdvertisementsByEmployerId(employerId).then((result) => setJobAdvertisements(result.data.data))
        }
    }, [currentUser.id])

    return (
        <div> 
            <Table celled>
                <TableHeader> 
                    <TableRow>
                        <TableHeaderCell>Position</TableHeaderCell>
                        <TableHeaderCell>Employer Name</TableHeaderCell>
                        <TableHeaderCell>City</TableHeaderCell>
                        <TableHeaderCell>Work Explanation</TableHeaderCell>
                        <TableHeaderCell>Open Position Amount</TableHeaderCell>
                        <TableHeaderCell>Publication Date</TableHeaderCell>
                        <TableHeaderCell>Last Application Date</TableHeaderCell>
                    </TableRow>
                </TableHeader>

        <TableBody>
            {
                jobAdvertisements.map(jobAdvertisement => (
                    <TableRow key="{jobAdvertisement.id}">
                        <TableCell><Link to={`/jobAdvertisements/${jobAdvertisement.id}`}>{jobAdvertisement.job.jobTitle}</Link></TableCell>
                        <TableCell>{jobAdvertisement.employer.companyName}</TableCell>
                        <TableCell>{jobAdvertisement.city.cityName}</TableCell>
                        <TableCell>{jobAdvertisement.description}</TableCell>
                        <TableCell>{jobAdvertisement.openPositionAmount}</TableCell>
                        <TableCell>{jobAdvertisement.publicationDate}</TableCell>
                        <TableCell>{jobAdvertisement.lastApplicationDate}</TableCell>
                    </TableRow>
                ))
            }
        </TableBody>
                
                <TableFooter>
                                
                    <TableRow>
                        {/*<TableHeaderCell colSpan='3'>
                               <Menu floated='right' pagination>
                                <MenuItem as='a' icon>
                                    <Icon name='chevron left' />
                                </MenuItem>
                                <MenuItem as='a'>1</MenuItem>
                                <MenuItem as='a'>2</MenuItem>
                                <MenuItem as='a'>3</MenuItem>
                                <MenuItem as='a'>4</MenuItem>
                                <MenuItem as='a' icon>
                                    <Icon name='chevron right' />
                                </MenuItem>
                            </Menu>
                            
                        </TableHeaderCell>*/}
                    </TableRow>
                   
                </TableFooter>
                
            </Table>

        </div>
    )
}