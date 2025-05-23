import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import logo from "../assets/logo.png";
import styles from "../styles/NavBar.module.css";
import { NavLink } from "react-router-dom";
import {
  useCurrentUser,
  useSetCurrentUser,
} from "../contexts/CurrentUserContext";
import axios from "axios";
import useClickOutsideToggle from "../hooks/useClickOutsideToggle.js";
import { removeTokenTimestamp } from "../utils/utils";

const NavBar = () => {
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();

  const { expanded, setExpanded, ref } = useClickOutsideToggle();

  const handleSignOut = async () => {
    try {
      await axios.post("dj-rest-auth/logout/");
      setCurrentUser(null);
      removeTokenTimestamp();
    } catch (err) {
    }
  };

  const addStoryhubsFeedbackIcon = (
    <NavLink
      className={styles.NavLink}
      activeClassName={styles.Active}
      to="/storyhubs_feedbacks/create"
    >
      <OverlayTrigger
              placement="bottom"
              overlay={<Tooltip>New Feedback</Tooltip>}
            >
              <i className="far fa-plus-square"></i>
            </OverlayTrigger>
    </NavLink>
  );
  const loggedInIcons = (
    <>
      <NavLink
        className={styles.NavLink}
        activeClassName={styles.Active}
        to="/feed"
      >
        <OverlayTrigger
              placement="bottom"
              overlay={<Tooltip>Feed</Tooltip>}
            >
              <i className="fas fa-stream"></i>
            </OverlayTrigger>
      </NavLink>
      <NavLink
        className={styles.NavLink}
        activeClassName={styles.Active}
        to="/likes"
      >
         
        <OverlayTrigger
              placement="bottom"
              overlay={<Tooltip>Liked</Tooltip>}
            >
              <i className="fas fa-heart"></i>
            </OverlayTrigger>
      </NavLink>
      <NavLink className={styles.NavLink} to="/" onClick={handleSignOut}>
         
        <OverlayTrigger
              placement="bottom"
              overlay={<Tooltip>Log-out</Tooltip>}
            >
              <i className="fas fa-sign-out-alt"></i>
            </OverlayTrigger>
      </NavLink>
      <NavLink
        className={styles.NavLink}
        to={`/profiles/${currentUser?.profile_id}`}
      >
        <OverlayTrigger
              placement="bottom"
              overlay={<Tooltip>Profile</Tooltip>}
            >
              <i class="fa-solid fa-user"></i>
            </OverlayTrigger>
      </NavLink>
    </>
  );
  const loggedOutIcons = (
    <>
      <NavLink
        className={styles.NavLink}
        activeClassName={styles.Active}
        to="/login"
      >
        <OverlayTrigger
              placement="bottom"
              overlay={<Tooltip>Log-in</Tooltip>}
            >
              <i className="fas fa-sign-in-alt"></i>
            </OverlayTrigger>
      </NavLink>
      <NavLink
        to="/signup"
        className={styles.NavLink}
        activeClassName={styles.Active}
      >
         
        <OverlayTrigger
              placement="bottom"
              overlay={<Tooltip>SignUp</Tooltip>}
            >
              <i className="fas fa-user-plus"></i>
            </OverlayTrigger>
      </NavLink>
    </>
  );

  return (
    <Navbar
      expanded={expanded}
      className={styles.NavBar}
      expand="md"
      fixed="top"
    >
     <Container>
        <NavLink to="/">
          <Navbar.Brand>
            <img src={logo} alt="logo" height="45" />
          </Navbar.Brand>
        </NavLink>
        {currentUser && addStoryhubsFeedbackIcon}
        <Navbar.Toggle
          ref={ref}
          onClick={() => setExpanded(!expanded)}
          aria-controls="basic-navbar-nav"
        />
       <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto text-left">
            <NavLink
              exact
              className={styles.NavLink}
              activeClassName={styles.Active}
              to="/"
            >
              
              <OverlayTrigger
              placement="bottom"
              overlay={<Tooltip>Home</Tooltip>}
            >
              <i className="fas fa-home"></i> 
            </OverlayTrigger>
            </NavLink>

            {currentUser ? loggedInIcons : loggedOutIcons}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;