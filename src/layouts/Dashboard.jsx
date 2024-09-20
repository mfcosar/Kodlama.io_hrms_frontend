import React from "react";
import Filter from "./Filter";
import CandidatesList from "../pages/CandidatesList";
import JobAdvertisementsList from "../pages/JobAdvertisementsList";
import EmployersList from "../pages/EmployersList";
import { GridRow, GridColumn, Grid } from 'semantic-ui-react';
import { Container } from 'semantic-ui-react';

export default function Dashboard() {
    return (
        <div>
            <Container className="main">
            <Grid>
                <GridRow><GridColumn width={4}><Filter /></GridColumn>
                    <GridColumn width={12}><CandidatesList /></GridColumn>
                    </GridRow>
                    <GridRow><GridColumn width={4}><Filter /></GridColumn>
                        <GridColumn width={12}><JobAdvertisementsList /></GridColumn>
                    </GridRow>
                    <GridRow><GridColumn width={4}><Filter /></GridColumn>
                        <GridColumn width={12}><EmployersList /></GridColumn>
                    </GridRow>
            </Grid>
            </Container>
          
        </div>
    )
}