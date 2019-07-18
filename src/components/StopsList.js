import React from 'react';
import 'materialize-css/dist/css/materialize.css';
import {Collection, CollectionItem} from 'react-materialize';
import './StopsList.scss';

export default ({
    stops,
    className="",
    ...props
}) =>
    <Collection className={className} {...props}>
        {stops.map((stop, key) => {
            return (
                <CollectionItem key={key} href={`/?stopCode=${stop.stopCode}`} className="red-text text-darken-3">
                    {stop.stopName}
                </CollectionItem>
            )
        })}
    </Collection>