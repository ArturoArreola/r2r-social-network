import React from 'react';
import "./LeftMenu.scss";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Logo from "../../assets/face.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faHome,
    faUser,
    faUsers,
    faPowerOff
} from "@fortawesome/free-solid-svg-icons";
import { logoutApi } from "../../api/auth";

export default function LeftMenu(props) {

    const { setRefreshCheckLogin } = props;
    const logout = () => {
        logoutApi();
        setRefreshCheckLogin(true);
    }
    return (
        <div className="left-menu">
            <img className="logo" src={Logo} alt="SocialNetwork" />
            <Link to="/">
                <FontAwesomeIcon icon={faHome} /> Home
            </Link>
            <Link to="/users">
                <FontAwesomeIcon icon={faUsers} /> Users
            </Link>
            <Link to="/profile">
                <FontAwesomeIcon icon={faUser} /> Profile
            </Link>
            <Link to="" onClick={logout} >
                <FontAwesomeIcon icon={faPowerOff} /> Logout
            </Link>
            <Button>New Post</Button>
        </div>
    );
}
