import React, { Component } from "react";
import 'jquery';
import 'materialize-css/dist/js/materialize.js';
import 'materialize-css/dist/css/materialize.css';
import './UserStops.scss';
import {TextInput, Button, Icon} from 'react-materialize';
import {readUserData, saveStop, stopCodePattern} from "../libs/utils";
import StopsList from "../components/StopsList";

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
        this.setState({
            stops: readUserData().stops,
            stopName: '',
            stopCode: ''
        });
        console.log(readUserData())
    };

    validateForm = () => {
        return stopCodePattern.test(this.state.stopCode) && this.state.stopName.length > 0;
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

                {this.state.stops.length > 0 ?
                    <StopsList stops={this.state.stops} />
                    :
                    <h6>You don't have any saved stops yet :(</h6>
                }
            </div>
        )
    }
}
