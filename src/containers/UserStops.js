import React, { Component } from "react";
import 'jquery';
import 'materialize-css/dist/js/materialize.js';
import 'materialize-css/dist/css/materialize.css';
import './UserStops.scss';
import {TextInput, Button, Icon} from 'react-materialize';
import {readUserData, saveStop} from "../libs/utils";

export default class UserStops extends Component {
    constructor(props) {
        super(props);

        const userData = readUserData();
        const userStops = userData.hasOwnProperty('stops') ? userData.stops : [];
        this.state = {
            stopName: '',
            stopCode: '',
            stops: userStops
        };
    }

    componentDidMount() {
        console.log(this.state);
    }

    handleChange = (event) => {
        this.setState({
            [event.target.id]: event.target.value
        });
    };

    handleSubmit = () => {
        saveStop(this.state.stopName, this.state.stopCode);
        console.log(readUserData())
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