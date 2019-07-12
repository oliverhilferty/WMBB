import React, { Component } from "react";
import 'jquery';
import 'materialize-css/dist/js/materialize.js';
import 'materialize-css/dist/css/materialize.css';
import './Home.scss';
import {TextInput, Button, Preloader, Row, Icon, Table} from 'react-materialize';
import {getRawArrivals, parseRawArrivals} from '../libs/busses'

export default class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            stopCode: '',
            isLoading: false,
            userHasSubmitted: false,
            arrivals: []
        };
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
        const stopCodePattern = new RegExp('^[0-9]{5}$');
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
                />

                <Button
                    waves="light"
                    className="red darken-3"
                    onClick={this.handleSubmit}
                    disabled={!this.validateStopCode()}
                    type="number"
                >Submit <Icon right>send</Icon></Button>

                {this.state.isLoading &&
                    <Row className="center-align">
                        <Preloader
                            color="red"
                        />
                    </Row>
                }

                {this.state.arrivals.length > 0 &&
                    <Table>
                        <thead>
                        <tr>
                            <th data-field="route">
                                Route
                            </th>
                            <th data-field="destination">
                                Destination
                            </th>
                            <th data-field="time">
                                Time
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                            {this.state.arrivals.map((arrival) => {
                                return (
                                    <tr>
                                        <td>{arrival.routeNumber}</td>
                                        <td>{arrival.destination}</td>
                                        <td>{arrival.timeUntilArrivalString}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table>
                }
            </div>
        );
    }
}
