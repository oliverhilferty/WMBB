import React from 'react';
import 'materialize-css/dist/css/materialize.css';
import './SideNav.scss';
import {Link} from "react-router-dom";

export default ({
    links,
    // react-materialize unfortunately does not provide a way to programmatically close the sidenav, so we simulate
    // a click on the sidenav overlay in order to get it to close
    closeNav = () => document.querySelector('.sidenav-overlay').click()
}) => {
    return <>{
        links.map((link, key) => {
            return (
                <li key={key} onClick={closeNav}>
                    <Link to={link.href}>{link.name}</Link>
                </li>
            )
        })
    }</>
}
