import React, { Component } from 'react';
import 'jquery';
import 'materialize-css/dist/js/materialize.js';
import 'materialize-css/dist/css/materialize.css';
import './App.scss';
import { Container, Navbar, NavItem } from 'react-materialize';
import {Link} from "react-router-dom";
import Routes from './Routes';

class App extends Component {
    render() {
        return (
            <div className="App app-container">
                <Navbar
                    className="red darken-3"
                    alignLinks="right"
                    brand={
                        <Link to="/">Where's My Bloody Bus!?</Link>
                    }
                    sidenav={<>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/user-stops">My Stops</Link></li>
                    </>}
                >
                    <NavItem href="/">
                        <Link to="/">Home</Link>
                    </NavItem>
                    <NavItem>
                        <Link to="/user-stops">My Stops</Link>
                    </NavItem>
                </Navbar>
                <Container>
                    <Routes />
                </Container>
            </div>
        );
    }
}

export default App;