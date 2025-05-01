import React from 'react';
import { useState, useEffect } from 'react';
import { useParams, } from 'react-router';
import { useHistory } from 'react-router-dom';
import { TableRow, TableHeaderCell, TableHeader, TableFooter, TableCell, TableBody, MenuItem, Icon, Menu, Table } from 'semantic-ui-react'
import JobAdvertisementService from '../services/jobAdvertisementService';
import AuthService from '../services/authService';
import ConfirmJobAdvertisement from "../pages/ConfirmJobAdvertisement";

export default function UnconfirmedJobAdvertisementsList() {

    const currentUser = AuthService.getCurrentUser();
    const jobAdvertisementService = new JobAdvertisementService();
    let { employeeId } = useParams();
    const [unconfirmedJobAdvertisements, setUnconfirmedJobAdvertisements] = useState([]);
    const history = useHistory();

    useEffect(() => {
        if (!currentUser || (!currentUser.roles.includes("ROLE_ADMIN"))) {
            history("/unauthorized");
        } else {
            jobAdvertisementService.getUnconfirmedJobAdvertisements().then((result) => setUnconfirmedJobAdvertisements(result.data.data))
        }
    }, [currentUser.id, unconfirmedJobAdvertisements])

return (
        <div>
            <Table celled>
                <TableHeader>
                    <TableRow>
                        <TableHeaderCell>Position</TableHeaderCell>
                        <TableHeaderCell>Employer Name</TableHeaderCell>
                        <TableHeaderCell>City</TableHeaderCell>
                        <TableHeaderCell>Job Description</TableHeaderCell>
                        <TableHeaderCell>Working Time</TableHeaderCell>
                        <TableHeaderCell>Working Type</TableHeaderCell>
                        <TableHeaderCell>Open Position Amount</TableHeaderCell>
                        <TableHeaderCell>Last Application Date</TableHeaderCell>
                        <TableHeaderCell>Confirmation</TableHeaderCell>
                    </TableRow>
                </TableHeader>

        <TableBody>
            {
                unconfirmedJobAdvertisements.map(unconfirmedJobAdvertisement => (
                    <TableRow key="{unconfirmedJobAdvertisement.id}">
                        {/*<TableCell><Link to={`/unconfirmedJobAdvertisement/${unconfirmedjobAdvertisement.id}`}>{unconfirmedjobAdvertisement.job.jobTitle}</Link></TableCell>*/}
                        <TableCell>{unconfirmedJobAdvertisement.job.jobTitle}</TableCell>
                        <TableCell>{unconfirmedJobAdvertisement.employer.companyName}</TableCell>
                        <TableCell>{unconfirmedJobAdvertisement.city.cityName}</TableCell>
                        <TableCell>{unconfirmedJobAdvertisement.description}</TableCell>
                        <TableCell>{unconfirmedJobAdvertisement.workingTime.workingTimeName}</TableCell>
                        <TableCell>{unconfirmedJobAdvertisement.workingType.workingTypeName}</TableCell>
                        <TableCell>{unconfirmedJobAdvertisement.openPositionAmount}</TableCell>
                        <TableCell>{unconfirmedJobAdvertisement.lastApplicationDate}</TableCell>
                        <TableCell><ConfirmJobAdvertisement jobAdvertisementId={unconfirmedJobAdvertisement.id} employeeId={employeeId} /></TableCell>
                    </TableRow>
                ))
            }

        </TableBody>

                <TableFooter>
                    <TableRow>
                        <TableHeaderCell colSpan='9'>
                            <Menu floated='left' pagination>
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
                        </TableHeaderCell>
                    </TableRow>
                </TableFooter>
            </Table>

        </div>
    )

	}