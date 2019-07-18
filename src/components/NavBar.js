import React from 'react';
import 'materialize-css/dist/css/materialize.css';
import './NavBar.scss';
import Link from "react-router-dom/es/Link";
import { Navbar } from 'react-materialize';
import SideNav from "./SideNav";

export default ({
    links,
    className="",
    ...props
}) =>
    <Navbar
        className="red darken-3"
        alignLinks="right"
        brand={
            <Link to="/">Where's My Bloody Bus!?</Link>
        }
        sidenav={<SideNav links={links}/>}
        {...props}
    >
        {links.map((link, key) => {
            return <Link key={key} to={link.href}>{link.name}</Link>
        })}
    </Navbar>
