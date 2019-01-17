import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import auth0Client from '../Auth';

class NavBar extends Component {
    constructor(props) {
        super(props);
        this.toggleNavbar = this.toggleNavbar.bind(this);
        this.state = {
            collapsed: true,
        };
        
        this.signOut = this.signOut.bind(this);
    }
    toggleNavbar() {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }

    signOut() {
        auth0Client.signOut();
        this.props.history.replace('/');
    }

    render() {
        const collapsed = this.state.collapsed;
        const classOne = collapsed ? 'collapse navbar-collapse' : 'collapse navbar-collapse show';
        const classTwo = collapsed ? 'navbar-toggler navbar-toggler-right collapsed' : 'navbar-toggler navbar-toggler-right';
                console.log(auth0Client.getProfile());
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary fixed-top">
                
                {
                    auth0Client.isAuthenticated() &&
                    <img src={auth0Client.getProfile().picture} className="img-fluid img-thumbnail" 
                        alt={auth0Client.getProfile().name} title={auth0Client.getProfile().name} />
                }​
                
                <button className={`${classTwo}`} type="button" data-toggle="collapse" data-target="#navbarResponsive" 
                    aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation" onClick={this.toggleNavbar}>
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className={`${classOne}`} id="navbarResponsive">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            {
                                auth0Client.isAuthenticated() &&
                                <div>
                                    <label className="mr-2 text-white"></label>
                                </div>
                            }
                        </li>
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
                            <Link className="nav-link" to="/customer/add">
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
                        <button type="button" className="btn btn-link" onClick={this.signOut}>Sign Out</button>
                    }
                </div>
            </nav>

                
        );
    }
}

export default withRouter(NavBar);