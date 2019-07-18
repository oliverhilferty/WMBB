import React from 'react';
import 'materialize-css/dist/css/materialize.css';
import './SideNav.scss';
import {Link} from "react-router-dom";

export default ({
    links
}) => {
    return <>{
        links.map((link, key) => {
            return (
                <li key={key}>
                    <Link to={link.href}>{link.name}</Link>
                </li>
            )
        })
    }</>
}
