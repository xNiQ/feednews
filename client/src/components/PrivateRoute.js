import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isLogged } from '../controllers/auth';

const PrivateRoute = ({component: Component, ...rest}) => {
    return (
        <Route {...rest} render={props => (
            isLogged() ?
                <Component {...props} />
            : <Redirect to="/admin/login-to-admin-dashboard" />
        )} />
    );
};

export default PrivateRoute;