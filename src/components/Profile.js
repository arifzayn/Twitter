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
  CardImg,
} from "reactstrap";

import classnames from "classnames";
import { fire } from "../firebase";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("1");
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [status, setStatus] = useState("");
  const [data, setData] = useState("");

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  useEffect(() => {
    fire.auth().onAuthStateChanged(function (user) {
      if (user) {
        // User is signed in.

        fire
          .database()
          .ref("tweets/" + user.uid)
          .once("value", (snapshot) => {
            setData(snapshot.val());
            // Object.values(data).forEach((ele) => {
            //   console.log(ele);
            // });
            // snapshot.forEach((childSnapshot) => {
            //   // var childKey = childSnapshot.key ;
            //   // var childData = childSnapshot.val();
            //   // ...
            // });
          });

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
          .update(
            {
              full_name: name,
              contact: contact,
              status: status,
            },
            (error) => {
              if (error) {
                // The write failed...
              } else {
                // Data saved successfully!
                console.log("Profile Updated!");
              }
            }
          );
      } else {
        // No user is signed in.
      }
    });
    console.log("Task Edited!");
  };

  return (
    <div
      style={{
        // backgroundImage: 'url("")',
        // backgroundSize: "cover",
        // backgroundRepeat: "no-repeat",
        height: "93vh",
        // background: #74ebd5;  /* fallback for old browsers */
        // background: -webkit-linear-gradient(to right, #ACB6E5, #74ebd5);  /* Chrome 10-25, Safari 5.1-6 */
        // background:
        // "linear-gradient(to right, #ACB6E5, #74ebd5)" /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */,
      }}
    >
      <Container>
        <h1 className="text-center display-1">Profile</h1>
        <Row className="mt-4">
          <Col xs="12" md="6" className="border border-danger mb-4">
            <Form className="w-75 mx-auto" onSubmit={handleSubmit}>
              <FormGroup row>
                <Label for="exampleName" sm={2}>
                  Name
                </Label>
                <Col sm={10}>
                  <Input
                    type="text"
                    id="exampleName"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="exampleContact" sm={2}>
                  Contact
                </Label>
                <Col sm={10}>
                  <Input
                    type="number"
                    id="exampleContact"
                    name="contact"
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="exampleStatus" sm={2}>
                  Status
                </Label>
                <Col sm={10}>
                  <Input
                    type="text"
                    id="exampleStatus"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
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
                    {Object.values(data).map((d, index) => {
                      return (
                        <div className="d-flex justify-content-center">
                          <Card
                            key={index}
                            className="mb-4"
                            style={{
                              width: "18rem",
                            }}
                          >
                            <CardImg
                              top
                              src={d.tweet_image}
                              alt="tweet_image"
                            />
                            <Card body>
                              <CardTitle>{d.id}</CardTitle>
                              <CardText>{d.tweet_text}</CardText>
                              {/* <Button>Go somewhere</Button> */}
                            </Card>
                          </Card>
                        </div>
                      );
                    })}
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
    </div>
  );
};

export default Profile;
