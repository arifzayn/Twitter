import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { fire } from "./firebase";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  let history = useHistory();

  const handleSubmit = (e) => {
    fire
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        // var user = userCredential.user;
        // ...

        console.log("Login Successful");

        // window.location = "/newsfeed";
        history.push("/newsfeed");
      })
      .catch((error) => {
        // var errorCode = error.code;
        var errorMessage = error.message;

        console.log(errorMessage);
      });
    e.preventDefault();
  };

  return (
    <>
      <img
        src="https://cdn.worldvectorlogo.com/logos/twitter-5.svg"
        width="100"
        height="100"
        alt="twitter"
      />
      <h1 className="mb-4">Login to Twitter</h1>
      <Form className="w-25 mx-auto" onSubmit={handleSubmit}>
        <FormGroup>
          <Label for="exampleEmail">Email</Label>
          <Input
            type="email"
            name="email"
            id="exampleEmail"
            placeholder="something@idk.cool"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="examplePassword">Password</Label>
          <Input
            type="password"
            name="password"
            id="examplePassword"
            placeholder="don't tell!"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormGroup>
        <Button>Submit</Button>
      </Form>
    </>
  );
};

export default Login;
