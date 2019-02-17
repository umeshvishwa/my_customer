import React from 'react';
import {Route} from 'react-router-dom';
import auth0Client from '../Auth';
import constants from '../config';

function SecuredAdminRoute(props) {
  const {component: Component, path, checkingSession} = props;
  return (
    <Route path={path} render={(props) => {
        if (checkingSession) return <h3 className="text-center">Validating session...</h3>;
        if (!auth0Client.isAuthenticated()) {
          auth0Client.signIn();
          return <div></div>;
        }

        if(!auth0Client.hasRole(['admin'])) {
          props.history.replace('/error/403');
        }
        if(!auth0Client.isEmailVerified()) {
          return <div className="alert alert-danger">
            {constants.message.EMAIL_VERIFICATION} <b>{constants.app.title}</b> App.
          </div>;
        }
        
        return <Component {...props}/>
    }} />
  );
}

export default SecuredAdminRoute;