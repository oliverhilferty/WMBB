import React, { Component } from 'react';
import 'jquery';
import 'materialize-css/dist/js/materialize.js';
import 'materialize-css/dist/css/materialize.css';
import './App.scss';
import { Container} from 'react-materialize';
import NavBar from './components/NavBar';
import Routes from './Routes';

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
                <NavBar links={this.state.navLinks}/>
                <Container>
                    <Routes />
                </Container>
            </div>
        );
    }
}

export default App;