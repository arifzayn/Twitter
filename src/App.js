import Signup from "./Signup";
import Example from "./Navbar";
import { Col, Container, Row } from "reactstrap";

function App() {
  return (
    <>
      <Example />
      <Container
        className="border border-danger text-center d-flex align-items-center justify-content-center"
        style={{ minHeight: "90vh" }}
      >
        <Row className="">
          <Col xs="12" md="6" className="border border-danger my-auto">
            <h1>Welcome</h1>
          </Col>
          <Col xs="12" md="6" className="border border-danger">
            <Signup />
          </Col>
        </Row>
      </Container>
      {/* <Signup /> */}
    </>
  );
}

export default App;
