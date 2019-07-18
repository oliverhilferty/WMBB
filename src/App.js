import React, { Component } from 'react';
import 'jquery';
import 'materialize-css/dist/js/materialize.js';
import 'materialize-css/dist/css/materialize.css';
import './App.scss';
import { Container, Navbar, NavItem } from 'react-materialize';
import {Link} from "react-router-dom";
import Routes from './Routes';
import SideNav from "./components/SideNav";

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            navLinks: [
                {
                    name: "Home",
                    href: "/"
                },
                {
                    name: "My Stops",
                    href: "/user-stops"
                }
            ]
        }
    }

    render() {
        return (
            <div className="App app-container">
                <Navbar
                    className="red darken-3"
                    alignLinks="right"
                    brand={
                        <Link to="/">Where's My Bloody Bus!?</Link>
                    }
                    sidenav={<SideNav links={this.state.navLinks}/>}
                >
                    {this.state.navLinks.map((link, key) => {
                        return <Link key={key} to={link.href}>{link.name}</Link>
                    })}
                </Navbar>
                <Container>
                    <Routes />
                </Container>
            </div>
        );
    }
}

export default App;