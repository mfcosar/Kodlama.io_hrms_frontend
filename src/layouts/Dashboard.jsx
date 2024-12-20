import React from "react";
import CandidatesList from "../pages/CandidatesList";
import JobAdvertisementsList from "../pages/JobAdvertisementsList";
import JobAdvertisementDetail from "../pages/JobAdvertisementDetail";
import UnconfirmedJobAdvertisementsList from "../pages/UnconfirmedJobAdvertisementsList";
import JobAdvertisementAdd from "../pages/JobAdvertisementAdd";
import CityAdd from "../pages/CityAdd";
import JobAdd from "../pages/JobAdd";
import Login from "../components/Login";
import SignUp from "../components/SignUp";
import Unauthorized from "../pages/Unauthorized";
import BoardUser from "../components/BoardUser";
import BoardAdmin from "../components/BoardAdmin";
import BoardCandidate from "../components/BoardCandidate";
import Profile from "../components/Profile";
import RegisterCandidate from "../pages/RegisterCandidate";
import RegisterUser2 from "../pages/RegisterUser2";
import RegisterUser from "../pages/RegisterUser";

import Trial from "../pages/Trial";

import EmployersList from "../pages/EmployersList";
import { GridRow, GridColumn, Grid } from 'semantic-ui-react';
import { ToastContainer } from 'react-toastify';
import { Route, Switch } from 'react-router';


export default function Dashboard() {

    return (
        <div>
            <ToastContainer position="bottom-right" />
            <Grid>
                <GridRow><GridColumn width={4}>Here is sidebar</GridColumn>
                         <GridColumn width={12}>  

                   <Switch> {/* multiple path match problem çözüldü */}
                        <Route exact path="/" component={JobAdvertisementsList} />
                        <Route exact path="/jobAdvertisements" component={JobAdvertisementsList} />
                        <Route path="/jobAdvertisement/add" component={JobAdvertisementAdd} /> 
                        <Route path="/jobAdvertisements/:id" component={JobAdvertisementDetail} />
                        <Route path="/unconfirmedjobadvertisements" component={UnconfirmedJobAdvertisementsList} />
                        <Route path="/city/add" component={CityAdd} />
                        <Route path="/job/add" component={JobAdd} />
                        <Route path="/candidate/register" component={RegisterCandidate} />
                        <Route path="/candidates" component={CandidatesList} />
                        <Route path="/employers" component={EmployersList} />
                        <Route path="/login" component={Login} />
                        <Route path="/signup" component={SignUp} />
                        <Route path="/user/register" component={RegisterUser} />
                        <Route path="/user/register2" component={RegisterUser2} />
                        <Route path="/user" component={BoardUser} />
                        <Route path="/admin" component={BoardAdmin} />
                        <Route path="/candidate" component={BoardCandidate} />
                        <Route path="/profile" component={Profile} />
                        <Route path="/unauthorized" component={Unauthorized} />
                        
                        <Route path="/trial" component={Trial} />
                    </Switch>
                    </GridColumn>
                    </GridRow>

            </Grid>
         
        </div>
    )
}