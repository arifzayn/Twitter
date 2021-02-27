import React, { useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { NavLink as RRNavLink } from "react-router-dom";
import { fire } from "./firebase";
import "./App.css";

import { AwesomeButtonSocial } from "react-awesome-button";
import "react-awesome-button/dist/styles.css";

const Navigationbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const [users, setUser] = useState(null);

  fire.auth().onAuthStateChanged(function (user) {
    if (user) {
      // User is signed in.
      setUser(user);
    } else {
      // No user is signed in.
    }
  });

  const logout = () => {
    fire
      .auth()
      .signOut()
      .then(() => {
        // Sign-out successful.
        console.log("Sign-out successful.");
        window.location = "/";
      })
      .catch((error) => {
        // An error happened.
        console.log(error);
      });
  };

  return (
    <Navbar
      color="light"
      light
      expand="md"
      sticky="top"
      className="simg"
      // style={{
      //   background: "linear-gradient(to right, #ACB6E5, #74ebd5)",
      // }}
    >
      <NavbarBrand href="/">Twitter</NavbarBrand>
      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className="ml-auto" navbar>
          {users ? (
            <UncontrolledDropdown nav inNavbar className="mr-4">
              <DropdownToggle nav caret>
                {users.email}
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>
                  <NavItem>
                    <NavLink tag={RRNavLink} to="/profile">
                      Profile
                    </NavLink>
                  </NavItem>
                </DropdownItem>
                <DropdownItem>
                  <NavItem>
                    <NavLink tag={RRNavLink} to="/newsfeed">
                      Newsfeed
                    </NavLink>
                  </NavItem>
                </DropdownItem>
                <DropdownItem onClick={logout}>Logout</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          ) : (
            <NavItem>
              <NavLink
                tag={RRNavLink}
                to="/login"
                onClick={toggle}
                className="mr-4"
              >
                Login
              </NavLink>
            </NavItem>
          )}

          <NavItem>
            {/* <NavLink> */}
            <AwesomeButtonSocial
              type="github"
              target="_blank"
              href="https://github.com/arifzayn/Twitter"
              size="medium"
            ></AwesomeButtonSocial>
            {/* </NavLink> */}
          </NavItem>
        </Nav>
      </Collapse>
    </Navbar>
  );
};

export default Navigationbar;
