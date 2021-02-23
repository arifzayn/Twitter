import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Container,
  Row,
  Col,
} from "reactstrap";

import { fire } from "./firebase";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [contact, setContact] = useState("");
  const [profileImage, setProfileImage] = useState("");

  let history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(profileImage.name);

    fire
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        // ...

        var storage = fire.storage();

        var storageRef = storage.ref();

        var imagesRef = storageRef.child(username);

        imagesRef.put(profileImage).then((snapshot) => {
          console.log("Uploaded a blob or file!");

          snapshot.ref.getDownloadURL().then((downloadURL) => {
            console.log("File available at", downloadURL);

            fire
              .database()
              .ref("users/" + user.uid)
              .set({
                uid: user.uid,
                email: email,
                user_name: username,
                password: password,
                full_name: fullName,
                contact: contact,
                profile_picture: downloadURL,
              });
          });
        });

        // window.location = "/newsfeed";
        history.push("/newsfeed");
      })
      .catch((error) => {
        // var errorCode = error.code;
        var errorMessage = error.message;
        // ..
        console.log(errorMessage);
      });
  };

  return (
    <>
      <Container
        className="border border-danger text-center d-flex align-items-center justify-content-center"
        style={{ minHeight: "90vh" }}
      >
        <Row>
          <Col xs="12" md="6" className="border border-danger my-auto">
            <h1>Welcome</h1>
          </Col>
          <Col xs="12" md="6" className="border border-danger">
            <img
              src="https://cdn.worldvectorlogo.com/logos/twitter-5.svg"
              width="100"
              height="100"
              alt="twitter"
            />
            <h1 className="mb-4">Signup to Twitter</h1>
            <Form className="w-75 mx-auto" onSubmit={handleSubmit}>
              <FormGroup>
                <Label for="exampleEmail">Email</Label>
                <Input
                  type="email"
                  name="email"
                  id="exampleEmail"
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="something@idk.cool"
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label for="exampleUsername">Username</Label>
                <Input
                  type="text"
                  name="text"
                  id="exampleUsername"
                  placeholder="Username"
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label for="examplePassword">Password</Label>
                <Input
                  type="password"
                  name="password"
                  id="examplePassword"
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="don't tell!"
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label for="exampleFullname">Full Name</Label>
                <Input
                  type="text"
                  name="text"
                  onChange={(e) => setFullName(e.target.value)}
                  id="exampleFullname"
                  placeholder="Full Name"
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label for="exampleNumber">Contact No</Label>
                <Input
                  onChange={(e) => setContact(e.target.value)}
                  type="number"
                  name="Number"
                  id="exampleNumber"
                  placeholder="Contact No"
                />
              </FormGroup>
              <FormGroup>
                <Label for="exampleFile">Profile Image</Label>
                <Input
                  type="file"
                  name="file"
                  id="exampleFile"
                  onChange={(e) => setProfileImage(e.target.files[0])}
                />
              </FormGroup>
              <Button color="primary" block>
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Signup;
