import React from 'react';
import {Table} from "react-materialize";
import 'materialize-css/dist/css/materialize.css';
import './BusTable.scss';

export default ({
    className="",
    arrivals,
    ...props
}) =>
    <Table className={className} {...props}>
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
        {arrivals.map((arrival, key) => {
            return (
                <tr key={key}>
                    <td>{arrival.routeNumber}</td>
                    <td>{arrival.destination}</td>
                    <td>{arrival.timeUntilArrivalString}</td>
                </tr>
            )
        })}
        </tbody>
    </Table>