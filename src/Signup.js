import React, { useState } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";

import fire from "./firebase";

const Signup = (props) => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [contact, setContact] = useState("");
  const [profileImage, setProfileImage] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    fire
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        // ...

        fire.database().ref(user.uid).set({
          uid: user.uid,
          email: email,
          user_name: username,
          password: password,
          full_name: fullName,
          contact: contact,
          // profile_picture: profileImage,
        });

        // Get a reference to the storage service, which is used to create references in your storage bucket
        var storage = fire.storage();

        // Create a storage reference from our storage service
        var storageRef = storage.ref();

        // Create a child reference
        var imagesRef = storageRef.child(user.uid);
        // imagesRef now points to 'images'

        // Child references can also take paths delimited by '/'
        var spaceRef = storageRef.child(imagesRef + "/" + profileImage);
        // spaceRef now points to "images/space.jpg"
        // imagesRef still points to "images"
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        // ..
        console.log(errorMessage);
      });
  }

  return (
    <>
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
    </>
  );
};

export default Signup;
