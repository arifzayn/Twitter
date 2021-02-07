import React from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";

const Login = (props) => {
  return (
    <>
      <img
        src="https://cdn.worldvectorlogo.com/logos/twitter-5.svg"
        width="100"
        height="100"
        alt="twitter"
      />
      <h1 className="mb-4">Login to Twitter</h1>
      <Form className="w-25 mx-auto">
        <FormGroup>
          <Label for="exampleEmail">Email</Label>
          <Input
            type="email"
            name="email"
            id="exampleEmail"
            placeholder="something@idk.cool"
            required
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
          />
        </FormGroup>
        <Button>Submit</Button>
      </Form>
    </>
  );
};

export default Login;
