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

const Example = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const [users, setUser] = useState(null);

  // let history = useHistory();

  fire.auth().onAuthStateChanged(function (user) {
    if (user) {
      // User is signed in.
      setUser(user);
      // console.log(user);
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
        // history.push("/");
      })
      .catch((error) => {
        // An error happened.
        console.log(error);
      });
  };

  return (
    <Navbar color="light" light expand="md" sticky="top">
      <NavbarBrand href="/">Twitter</NavbarBrand>
      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className="ml-auto" navbar>
          {users ? (
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                {users.email}
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>
                  <NavItem>
                    <NavLink
                      tag={RRNavLink}
                      to="/profile"
                      onClick={() => console.log("Profile")}
                    >
                      Profile
                    </NavLink>
                  </NavItem>
                </DropdownItem>
                <DropdownItem onClick={logout}>Logout</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          ) : (
            <NavItem>
              <NavLink tag={RRNavLink} to="/login" onClick={toggle}>
                Login
              </NavLink>
            </NavItem>
          )}

          <NavItem>
            <NavLink href="https://github.com/arifzayn">GitHub</NavLink>
          </NavItem>
        </Nav>
      </Collapse>
    </Navbar>
  );
};

export default Example;
