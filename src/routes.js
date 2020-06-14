import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'

import Logon from './pages/Logon';
import Register from './pages/Register';
import Profile from './pages/Profile';
import NewEvent from './pages/NewEvent';
import Perfil from './pages/Perfil';
import Payment from './pages/Payment';
import AuthService from './service/authService';

function RouteAuthenticate({ component: Component, ...props }) {
    return (
        <Route {...props} render={(componentProps) => {
            if (AuthService.isUserAuthenticate()) {
                return (
                    <Component {...componentProps} />
                )
            } else {
                return (
                    <Redirect to={{ pathname: '/', state: { from: componentProps.location } }} />
                )
            }
        }} />
    )
}

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Logon} />
                <Route path="/register" component={Register} />
                <RouteAuthenticate path="/profile" component={Profile} />
                <RouteAuthenticate path="/event/new/:id?" component={NewEvent} />
                <RouteAuthenticate path="/perfil" component={Perfil} />
                <RouteAuthenticate path="/payment" component={Payment} />
            </Switch>
        </BrowserRouter>
    );
}
