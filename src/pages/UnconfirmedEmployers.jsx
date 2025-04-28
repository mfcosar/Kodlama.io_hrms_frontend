import React from "react";
import { useState, useEffect } from "react";
import { useParams, } from 'react-router';
import { useHistory } from 'react-router-dom';
import { TableRow, TableHeaderCell, TableHeader, TableFooter, TableCell, TableBody, MenuItem, Icon, Menu, Table } from 'semantic-ui-react'
import AuthService from '../services/authService';
import EmployerService from '../services/employerService';
import ConfirmEmployer from '../pages/ConfirmEmployer';

export default function UnconfirmedEmployers() {

    const currentUser = AuthService.getCurrentUser();
    const employerService = new EmployerService();

    let { employeeId } = useParams();
    const [unconfirmedEmployers, setUnconfirmedEmployers] = useState([]);
    const history = useHistory();

    useEffect(() => {
        if (!currentUser || (!currentUser.roles.includes("ROLE_ADMIN"))) {
            history("/unauthorized");
        } else {
            employerService.getUnconfirmedEmployers().then((result) => setUnconfirmedEmployers(result.data.data))
        }
    }, [currentUser.id]);

    return (
        <div className="container">
            <header className="jumbotron">
                <h3>
                    <strong>Unconfirmed Employers List</strong>
                </h3>
            </header>
            <p>
                <strong>Id:</strong> {employeeId}<br />
                <strong>Id:</strong> {currentUser.id}<br />
            </p>
            <div>
                <Table celled>
                    <TableHeader>
                        <TableRow>
                            <TableHeaderCell>User Name</TableHeaderCell>
                            <TableHeaderCell>Email</TableHeaderCell>
                            <TableHeaderCell>Verified</TableHeaderCell>
                            <TableHeaderCell>Company Name</TableHeaderCell>
                            <TableHeaderCell>Web Address</TableHeaderCell>
                            <TableHeaderCell>Phone Number</TableHeaderCell>
                            <TableHeaderCell>Confirmation</TableHeaderCell>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {
                            unconfirmedEmployers.map(unconfirmedEmployer => (
                                <TableRow key="{unconfirmedEmployer.id}">
                                    <TableCell>{unconfirmedEmployer.username}</TableCell>
                                    <TableCell>{unconfirmedEmployer.email}</TableCell>
                                    <TableCell>{unconfirmedEmployer.verified}</TableCell>
                                    <TableCell>{unconfirmedEmployer.companyName}</TableCell>
                                    <TableCell>{unconfirmedEmployer.webAddress}</TableCell>
                                    <TableCell>{unconfirmedEmployer.phoneNumber}</TableCell>
                                    <TableCell><ConfirmEmployer employerId={unconfirmedEmployer.id} employeeId={employeeId} /></TableCell>
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
        </div>
    );
};

