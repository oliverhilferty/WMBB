import React, { Component } from "react";
import 'jquery';
import 'materialize-css/dist/js/materialize.js';
import 'materialize-css/dist/css/materialize.css';
import './Home.scss';
import {TextInput, Button} from 'react-materialize';

export default class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {

        };
    }

    render() {
        return (
            <div className="Home">
                <TextInput label="Bus Stop Code" className="no-helper"/>
                <Button
                    waves="light"
                    className="red darken-3"
                >Submit</Button>
            </div>
        );
    }
}
