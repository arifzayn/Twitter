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
  const [profileImage, setProfileImage] = useState("");
  const [newProfileImage, setNewProfileImage] = useState("");
  const [tweetsData, setTweetsData] = useState("");

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
            if (snapshot.exists()) {
              setTweetsData(snapshot.val());
            }
          });

        fire
          .database()
          .ref("users/" + user.uid)
          .once("value", (snapshot) => {
            if (snapshot.exists()) {
              setName(snapshot.val().full_name);
              setContact(snapshot.val().contact);
              setStatus(snapshot.val().status);
              setProfileImage(snapshot.val().profile_picture);
            } else {
              console.log("No data available");
            }
          });
      } else {
        // No user is signed in.
      }
    });
  }, [profileImage]);

  const handleSubmit = (e) => {
    e.preventDefault();
    fire.auth().onAuthStateChanged(function (user) {
      if (user) {
        // User is signed in.

        var storage = fire.storage();
        var storageRef = storage.ref();
        var imagesRef = storageRef.child(name);

        imagesRef.put(newProfileImage).then((snapshot) => {
          console.log("Uploaded a blob or file!");

          snapshot.ref.getDownloadURL().then((downloadURL) => {
            console.log("File available at", downloadURL);
            fire
              .database()
              .ref("users/" + user.uid)
              .update({
                full_name: name,
                contact: contact,
                status: status,
                profile_picture: downloadURL,
              });
          });
        });
      } else {
        // No user is signed in.
      }
    });
    console.log("Task Edited!");
  };

  return (
    <div
      className="img text-center"
      style={{
        height: "93.6vh",
      }}
    >
      <Container>
        <h1 className="text-center display-3" style={{ fontWeight: "bolder" }}>
          Profile
        </h1>

        <Row className="mt-4">
          <Col xs="12" md="6" className="mb-4">
            <h5>Update your profile..</h5>
            <Form className="w-75 mx-auto" onSubmit={handleSubmit}>
              <div className="my-4">
                <img
                  src={profileImage}
                  width="100"
                  height="100"
                  alt="DP"
                  style={{ borderRadius: "50%" }}
                />
              </div>
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
                  <Input
                    type="file"
                    name="file"
                    id="exampleFile"
                    required
                    onChange={(e) => setNewProfileImage(e.target.files[0])}
                  />
                  <FormText color="muted">Choose a profile picture</FormText>
                </Col>
              </FormGroup>
              <FormGroup check row>
                <Col sm={{ size: 10, offset: 2 }}>
                  <Button color="info" block>
                    Update
                  </Button>
                </Col>
              </FormGroup>
            </Form>
          </Col>

          <Col xs="12" md="6">
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
                    {Object.values(tweetsData).map((d, index) => {
                      return (
                        <div
                          key={index}
                          className="d-flex justify-content-center"
                        >
                          <Card
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
                            </Card>
                          </Card>
                        </div>
                      );
                    })}
                  </Col>
                </TabPane>
                <TabPane tabId="2">
                  <h1>No Data</h1>
                </TabPane>
                <TabPane tabId="3">
                  <h1>No Data</h1>
                </TabPane>
              </TabContent>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Profile;
