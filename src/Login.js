import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Spinner,
  Alert,
  Container,
} from "reactstrap";
import { fire } from "./firebase";

const Login = () => {
  const [temail, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  let history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    fire
      .database()
      .ref("users")
      .once("value", (snapshot) => {
        snapshot.forEach((childSnapshot) => {
          // ...
          var { user_name, email } = childSnapshot.val();

          if (temail === user_name || temail === email) {
            fire
              .auth()
              .signInWithEmailAndPassword(email, password)
              .then((userCredential) => {
                // Signed in
                // var user = userCredential.user;
                // ...

                console.log("Login Successful");

                history.replace("/newsfeed");
              })
              .catch((error) => {
                // var errorCode = error.code;
                var errorMessage = error.message;

                console.log(errorMessage);
              });
          }
        });
      });
  };

  return (
    <div>
      {isLoading ? (
        <Container className="d-flex flex-column justify-content-center align-items-center mt-4">
          <img
            src="https://cdn.worldvectorlogo.com/logos/twitter-5.svg"
            width="100"
            height="100"
            alt="twitter"
          />
          <h1 className="mb-4">Login to Twitter</h1>
          <Form className="w-25" onSubmit={handleSubmit}>
            <FormGroup>
              <Label for="exampleEmail">Email, or username</Label>
              <Input
                type="text"
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
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormGroup>
            <Button color="info" block>
              Login
            </Button>
            <Alert color="light">
              <Spinner size="sm" />
              You will be redirected shortly and if not then you have entered
              Invalid Credentials!
            </Alert>
          </Form>
        </Container>
      ) : (
        <Container className="d-flex flex-column justify-content-center align-items-center mt-4">
          <img
            src="https://cdn.worldvectorlogo.com/logos/twitter-5.svg"
            width="100"
            height="100"
            alt="twitter"
          />
          <h1 className="mb-4">Login to Twitter</h1>
          <Form className="w-25" onSubmit={handleSubmit}>
            <FormGroup>
              <Label for="exampleEmail">Email, or username</Label>
              <Input
                type="text"
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
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormGroup>
            <Button block color="info">
              Login
            </Button>
          </Form>
        </Container>
      )}
    </div>
  );
};

export default Login;
