import React from 'react';
import { useState, useEffect } from 'react';
import { TableRow, TableHeaderCell, TableHeader, TableFooter, TableCell, TableBody, MenuItem, Icon, Menu, Table } from 'semantic-ui-react'
import EmployerService from '../services/employerService';

export default function EmployersList() {
    const [employers, setEmployers] = useState([]);
    useEffect(() => {
        let employerService = new EmployerService();
        employerService.getEmployers().then((result) => setEmployers(result.data.data))
    }, [])

    return (
        <div>
            <Table celled>
                <TableHeader>
                    <TableRow>
                        <TableHeaderCell>Isveren Adi</TableHeaderCell>
                        <TableHeaderCell>Web Adresi</TableHeaderCell>
                        <TableHeaderCell>Email</TableHeaderCell>
                        <TableHeaderCell>Telefon no</TableHeaderCell>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {
                        employers.map(employer => (
                            <TableRow key="{employer.id}">
                                <TableCell>{employer.companyName}</TableCell>
                                <TableCell>{employer.webAddress}</TableCell>
                                <TableCell>{employer.email}</TableCell>
                                <TableCell>{employer.phoneNumber}</TableCell>

                            </TableRow>
                        ))
                    }

                </TableBody>

                <TableFooter>
                    <TableRow>
                        <TableHeaderCell colSpan='3'>
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
                        </TableHeaderCell>
                    </TableRow>
                </TableFooter>
            </Table>
        </div>
    )
}