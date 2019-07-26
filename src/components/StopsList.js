import React from 'react';
import 'materialize-css/dist/css/materialize.css';
import {Collection, Icon} from 'react-materialize';
import './StopsList.scss';
import Link from "react-router-dom/es/Link";

export default ({
    stops,
    className="",
    deleteStop,
    ...props
}) =>
    <Collection className={className} {...props}>
        {stops.map((stop, key) => {
            return (
                <Link to={`/?stopCode=${stop.stopCode}`} className="collection-item black-text" key={key}>
                    {stop.stopName}
                    <i
                        className="material-icons red-text text-darken-3 secondary-content"
                        onClick={(ev) => {
                            ev.preventDefault();
                            deleteStop(stop.id)
                        }}
                    >close</i>
                </Link>
            )
        })}
    </Collection>
