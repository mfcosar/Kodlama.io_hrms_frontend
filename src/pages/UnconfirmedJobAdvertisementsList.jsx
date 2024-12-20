import React from 'react';
import { useState, useEffect} from 'react';
import { TableRow, TableHeaderCell, TableHeader, TableFooter, TableCell, TableBody, MenuItem, Icon, Menu, Table } from 'semantic-ui-react'
import JobAdvertisementService from '../services/jobAdvertisementService';
import ConfirmJobAdvertisement from "../pages/ConfirmJobAdvertisement";

export default function UnconfirmedJobAdvertisementsList() {

    const [unconfirmedJobAdvertisements, setUnconfirmedJobAdvertisements] = useState([]);
    let jobAdvertisementService = new JobAdvertisementService();
    
      useEffect(() => {
        jobAdvertisementService.getUnconfirmedJobAdvertisements().then((result) => setUnconfirmedJobAdvertisements(result.data.data))
      }, [unconfirmedJobAdvertisements])

return (
        <div>
            <Table celled>
                <TableHeader>
                    <TableRow>
                        <TableHeaderCell>Pozisyon</TableHeaderCell>
                        <TableHeaderCell>Isveren Adi</TableHeaderCell>
                        <TableHeaderCell>Sehir</TableHeaderCell>
                        <TableHeaderCell>Is Aciklamasi</TableHeaderCell>
                        <TableHeaderCell>Calisma zamani</TableHeaderCell>
                        <TableHeaderCell>Calisma tipi</TableHeaderCell>
                        <TableHeaderCell>Acik Pozisyon Adedi</TableHeaderCell>
                        <TableHeaderCell>Son Basvuru Tarihi</TableHeaderCell>
                        <TableHeaderCell>Onaylama</TableHeaderCell>
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
                        <TableCell><ConfirmJobAdvertisement id={unconfirmedJobAdvertisement.id} /></TableCell>
                        {/*<TableCell><ConfirmJobAdvertisement handleConfirm={handleConfirm} id={unconfirmedJobAdvertisement.id} /></TableCell>*/}
                        {/*<TableCell><Button primary text="Confirm" onClick={() => handleOnClickConfirm()} id={unconfirmedJobAdvertisement.id}  /></TableCell>*/}
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