import React from 'react';
import { useState, useEffect } from 'react';
import { TableRow, TableHeaderCell, TableHeader, TableFooter, TableCell, TableBody, MenuItem, Icon, Menu, Table } from 'semantic-ui-react'
import JobAdvertisementService from '../services/jobAdvertisementService';

export default function JobAdvertisementsList() {
    const [jobAdvertisements, setJobAdvertisements] = useState([]);
    useEffect(() => {
        let jobAdvertisementService = new JobAdvertisementService();
        jobAdvertisementService.getJobAdvertisements().then((result) => setJobAdvertisements(result.data.data))
    })

    return (
        <div>
            <Table celled>
                <TableHeader>
                    <TableRow>
                        <TableHeaderCell>Pozisyon</TableHeaderCell>
                        <TableHeaderCell>Isveren Adi</TableHeaderCell>
                        <TableHeaderCell>Sehir</TableHeaderCell>
                        <TableHeaderCell>Is Aciklamasi</TableHeaderCell>
                        <TableHeaderCell>Acik Pozisyon Adedi</TableHeaderCell>
                        <TableHeaderCell>Son Basvuru Tarihi</TableHeaderCell>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {
                        jobAdvertisements.map(jobAdvertisement => (
                            <TableRow key="{jobAdvertisement.id}">
                                <TableCell>{jobAdvertisement.job.jobTitle}</TableCell>
                                <TableCell>{jobAdvertisement.employer.companyName}</TableCell>
                                <TableCell>{jobAdvertisement.city.cityName}</TableCell>
                                <TableCell>{jobAdvertisement.description}</TableCell>
                                <TableCell>{jobAdvertisement.openPositionAmount}</TableCell>
                                <TableCell>{jobAdvertisement.lastApplicationDate}</TableCell>
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