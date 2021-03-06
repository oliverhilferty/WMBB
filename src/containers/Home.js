import React, { Component } from "react";
import 'jquery';
import 'materialize-css/dist/js/materialize.js';
import 'materialize-css/dist/css/materialize.css';
import './Home.scss';
import {TextInput, Button, Preloader, Row, Icon} from 'react-materialize';
import {getRawArrivals, parseRawArrivals} from '../libs/busses'
import {stopCodePattern} from "../libs/utils";
import BusTable from "../components/BusTable";

export default class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            stopCode: '',
            isLoading: false,
            userHasSubmitted: false,
            arrivals: []
        };

        const url = new URL(document.location.href);
        const stopCode = url.searchParams.get('stopCode');
        if (stopCode !== null) {
            this.state.stopCode = stopCode;
            this.handleSubmit().then();
        }
    }

    handleChange = (event) => {
        this.setState({
            [event.target.id]: event.target.value
        });
    };

    handleSubmit = async () => {
        this.setState({
            arrivals: [],
            isLoading: true
        });

        const rawArrivals = await getRawArrivals(this.state.stopCode);
        const parsedArrivals = parseRawArrivals(rawArrivals);

        this.setState({
            arrivals: parsedArrivals,
            isLoading: false
        });
    };

    validateStopCode = () => {
        return stopCodePattern.test(this.state.stopCode);
    };

    render() {
        return (
            <div className="Home">
                <TextInput
                    label="Bus Stop Code"
                    className="no-helper"
                    id="stopCode"
                    onChange={this.handleChange}
                    value={this.state.stopCode}
                    type="number"
                />

                <Button
                    waves="light"
                    className="red darken-3"
                    onClick={this.handleSubmit}
                    disabled={!this.validateStopCode()}
                >Submit <Icon right>send</Icon></Button>

                {this.state.isLoading &&
                    <Row className="center-align">
                        <Preloader
                            color="red"
                        />
                    </Row>
                }

                {this.state.arrivals.length > 0 &&
                    <BusTable arrivals={this.state.arrivals} />
                }
            </div>
        );
    }
}
