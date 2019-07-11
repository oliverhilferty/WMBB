import React, { Component } from 'react';
import 'jquery';
import 'materialize-css/dist/js/materialize.js';
import 'materialize-css/dist/css/materialize.css';
import './App.css';
import { Container } from 'react-materialize';

class App extends Component {
    render() {
        return (
            <div className="App app-container">
                <nav>
                    <div className="nav-wrapper red darken-3">
                        <Container>
                            <a href="/" className="wmbb breadcrumb">Where's My Bloody Bus!?</a>
                        </Container>
                    </div>
                </nav>
                <Container>

                </Container>
            </div>
        );
    }
}

export default App;