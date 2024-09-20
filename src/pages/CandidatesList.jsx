import React from 'react';
import { useState, useEffect } from 'react';
import { TableRow, TableHeaderCell, TableHeader, TableFooter, TableCell, TableBody, MenuItem, Icon, Menu, Table } from 'semantic-ui-react'
import CandidateService from '../services/candidateService';
export default function CandidatesList() {
    const [candidates, setCandidates] = useState([]);
    useEffect(() => {
        let candidateService = new CandidateService();
        candidateService.getCandidates().then((result) => setCandidates(result.data.data))
    })

    return (
        <div>
            <Table celled>
                <TableHeader>
                    <TableRow>
                        <TableHeaderCell>Aday Adi</TableHeaderCell>
                        <TableHeaderCell>Soyadi</TableHeaderCell>
                        <TableHeaderCell>Email</TableHeaderCell>
                        <TableHeaderCell>TC Id</TableHeaderCell>
                        <TableHeaderCell>Dogum Yili</TableHeaderCell>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {
                        candidates.map(candidate => (
                            <TableRow key="{candidate.id}">
                                <TableCell>{candidate.firstName}</TableCell>
                                <TableCell>{candidate.lastName}</TableCell>
                                <TableCell>{candidate.email}</TableCell>
                                <TableCell>{candidate.tcIdentityNumber}</TableCell>
                                <TableCell>{candidate.birthYear}</TableCell>
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