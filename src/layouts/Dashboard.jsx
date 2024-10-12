import React from "react";
import CandidatesList from "../pages/CandidatesList";
import JobAdvertisementsList from "../pages/JobAdvertisementsList";
import JobAdvertisementDetail from "../pages/JobAdvertisementDetail";
import UnconfirmedJobAdvertisementsList from "../pages/UnconfirmedJobAdvertisementsList";
import AddJobAdvertisement from "../pages/AddJobAdvertisement";
import AddCity from "../pages/AddCity";

import EmployersList from "../pages/EmployersList";
import { GridRow, GridColumn, Grid } from 'semantic-ui-react';
import { Container } from 'semantic-ui-react';
import { Route } from 'react-router';

export default function Dashboard() {
    return (
        <div>
            <Container className="main">
            <Grid>
                <GridRow><GridColumn width={4}>Here is sidebar</GridColumn>
                    <GridColumn width={12}>
                        <Route exact path="/" component={JobAdvertisementsList} />
                        <Route exact path="/jobadvertisements/add" component={AddJobAdvertisement} /> 
                        <Route exact path="/jobadvertisements/:id" component={JobAdvertisementDetail} />
                        <Route exact path="/jobadvertisements" component={JobAdvertisementsList} />
                        <Route exact path="/unconfirmedjobadvertisements" component={UnconfirmedJobAdvertisementsList} />
                        <Route exact path="/cities/add" component={AddCity} />
                        <Route exact path="/candidates" component={CandidatesList} />
                        <Route exact path="/employers" component={EmployersList} />

                    </GridColumn>
                    </GridRow>

            </Grid>
            </Container>
          
        </div>
    )
}