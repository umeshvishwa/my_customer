import React from 'react';
import {Link, withRouter} from 'react-router-dom';
import auth0Client from '../Auth';

function NavBar(props) {
    const signOut = () => {
        auth0Client.signOut();
        props.history.replace('/');
    };
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary fixed-top">
            <Link className="navbar-brand" to="/">
                My Customer App
            </Link>

            {
                auth0Client.isAuthenticated() &&
                <div>
                    <label className="mr-2 text-white">{auth0Client.getProfile().name}</label>
                </div>
            }
            
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" 
                aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarColor01">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                        <Link className="nav-link" to="/">
                            Home
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/customers">
                            Customers
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/add-customer">
                            Add Customer
                        </Link>
                    </li>
                </ul>
                {
                    !auth0Client.isAuthenticated() &&
                    <button type="button" className="btn btn-link" onClick={auth0Client.signIn}>Sign In</button>
                }
                {
                    auth0Client.isAuthenticated() &&
                    <button type="button" className="btn btn-link" onClick={() => {signOut()}}>Sign Out</button>
                }
            </div>
        </nav>

            
    );
}

export default withRouter(NavBar);