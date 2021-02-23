import React, { useEffect, useState } from "react";
import {
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  Container,
  Row,
  TabPane,
  Card,
  CardTitle,
  CardText,
  TabContent,
  NavItem,
  Nav,
  NavLink,
} from "reactstrap";

import classnames from "classnames";
import { fire } from "../firebase";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("1");
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [status, setStatus] = useState("");

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  useEffect(() => {
    fire.auth().onAuthStateChanged(function (user) {
      if (user) {
        // User is signed in.
        fire
          .database()
          .ref("users/" + user.uid)
          .once("value", (snapshot) => {
            if (snapshot.exists()) {
              console.log(snapshot.val());
              console.log();
              setName(snapshot.val().full_name);
              setContact(snapshot.val().contact);
              setStatus(snapshot.val().status);
            } else {
              console.log("No data available");
            }
          });
      } else {
        // No user is signed in.
      }
    });
  }, []);

  const handleSubmit = () => {
    fire.auth().onAuthStateChanged(function (user) {
      if (user) {
        // User is signed in.
        fire
          .database()
          .ref("users/" + user.uid)
          .set({
            // name: document.getElementById("editName").value,
            // description: document.getElementById("editDescription").value,
            // status: document.getElementById("editStatus").value,
            // userId: uid,
            contact: contact,
          });
      } else {
        // No user is signed in.
      }
    });
    console.log("Task Edited!");
  };

  const handleInputChange = (e) => {
    // const target = e.target;
    // const value = target.type === "checkbox" ? target.checked : target.value;
    // const name = target.name;

    setName(e.target.contact);
    // setContact(snapshot.val().contact);
    // setStatus(snapshot.val().status);
  };

  return (
    <Container>
      <h1 className="text-center display-1">Profile</h1>
      <Row className=" mt-4">
        <Col xs="12" md="6" className="border border-danger">
          <Form className="w-75 mx-auto" onSubmit={handleSubmit}>
            <FormGroup row>
              <Label for="exampleEmail" sm={2}>
                Name
              </Label>
              <Col sm={10}>
                <Input
                  type="text"
                  id="exampleEmail"
                  value={name}
                  onChange={handleInputChange}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="examplePassword" sm={2}>
                Contact
              </Label>
              <Col sm={10}>
                <Input
                  type="number"
                  id="examplePassword"
                  name="contact"
                  value={contact}
                  onChange={handleInputChange}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="exampleEmail" sm={2}>
                Status
              </Label>
              <Col sm={10}>
                <Input
                  type="text"
                  id="exampleEmail"
                  value={status}
                  onChange={handleInputChange}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="exampleFile" sm={2}>
                Profile Picture
              </Label>
              <Col sm={10}>
                <Input type="file" name="file" id="exampleFile" />
                <FormText color="muted">Choose a profile picture</FormText>
              </Col>
            </FormGroup>
            <FormGroup check row>
              <Col sm={{ size: 10, offset: 2 }}>
                <Button>Update</Button>
              </Col>
            </FormGroup>
          </Form>
        </Col>

        <Col xs="12" md="6" className="border border-danger">
          <div>
            <Nav tabs>
              <NavItem>
                <NavLink
                  className={classnames({ active: activeTab === "1" })}
                  onClick={() => {
                    toggle("1");
                  }}
                >
                  Tweets
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({ active: activeTab === "2" })}
                  onClick={() => {
                    toggle("2");
                  }}
                >
                  Likes
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({ active: activeTab === "3" })}
                  onClick={() => {
                    toggle("3");
                  }}
                >
                  Followers/Followings
                </NavLink>
              </NavItem>
            </Nav>
            <TabContent activeTab={activeTab}>
              <TabPane tabId="1">
                <Col sm="12" className="mt-4">
                  <Card body>
                    <CardTitle>Special Title Treatment</CardTitle>
                    <CardText>
                      With supporting text below as a natural lead-in to
                      additional content.
                    </CardText>
                    {/* <Button>Go somewhere</Button> */}
                  </Card>
                </Col>
              </TabPane>
              <TabPane tabId="2">
                {/* <Row>
                  <Col sm="6">
                    <Card body>
                      <CardTitle>Special Title Treatment</CardTitle>
                      <CardText>
                        With supporting text below as a natural lead-in to
                        additional content.
                      </CardText>
                      <Button>Go somewhere</Button>
                    </Card>
                  </Col>
                  <Col sm="6">
                    <Card body>
                      <CardTitle>Special Title Treatment</CardTitle>
                      <CardText>
                        With supporting text below as a natural lead-in to
                        additional content.
                      </CardText>
                      <Button>Go somewhere</Button>
                    </Card>
                  </Col>
                </Row> */}
              </TabPane>
              <TabPane tabId="3"></TabPane>
            </TabContent>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;
