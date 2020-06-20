import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isLogged } from '../controllers/auth';

const Auth = ({component: Component, ...rest}) => {
    return (
        <Route {...rest} render={props => (
            isLogged() ?
                <Redirect to="/dashboard"/>
            : <Component {...props}/>
        )} />
    );
};

export default Auth;