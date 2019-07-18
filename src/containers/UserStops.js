import React, { Component } from "react";
import 'jquery';
import 'materialize-css/dist/js/materialize.js';
import 'materialize-css/dist/css/materialize.css';
import './UserStops.scss';
import {TextInput, Button, Icon} from 'react-materialize';

export default class UserStops extends Component {
    constructor(props) {
        super(props);

        this.state = {
            stopName: '',
            stopCode: ''
        }
    }

    handleChange = (event) => {
        this.setState({
            [event.target.id]: event.target.value
        });
    };

    validateForm = () => {
        return true;
    };

    render() {
        return (
            <div className="UserStops">
                <h4>Add a stop</h4>
                <TextInput
                    label="Name"
                    id="stopName"
                    onChange={this.handleChange}
                    value={this.state.stopName}
                    type="text"
                />
                <TextInput
                    label="Stop Code"
                    id="stopCode"
                    onChange={this.handleChange}
                    value={this.state.stopCode}
                    type="number"
                />
                <Button
                    waves="light"
                    className="red darken-3"
                    onClick={this.handleSubmit}
                    disabled={!this.validateForm()}
                >Add <Icon right>add</Icon></Button>
                <div className="divider" />
                <h4>My Stops</h4>
            </div>
        )
    }
}