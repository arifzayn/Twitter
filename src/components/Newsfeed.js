import { Col, Container, Row } from "reactstrap";
import Tweet from "./Tweet";
import { database, fire } from "../firebase";
import { useEffect, useState } from "react";
import Feed from "./Feed";
import Users from "./Users";
const Newsfeed = () => {
  const [data, setData] = useState("");

  useEffect(() => {
    fire.auth().onAuthStateChanged(function (user) {
      if (user) {
        // User is signed in.

        database.ref("tweets").once("value", (snapshot) => {
          setData(snapshot.val());
        });
      } else {
        // No user is signed in.
      }
    });
  }, []);

  return (
    <div className="img">
      <Container>
        <h1 className="text-center display-3" style={{ fontWeight: "bolder" }}>
          Newsfeed
        </h1>
        <Row>
          <Col xs="12" sm="3" className="mb-4">
            <div className="d-flex justify-content-center">
              <Tweet />
            </div>
          </Col>
          <Col xs="auto" sm="6">
            <Feed tweets={data} />
          </Col>
          <Col sm="3">
            <Users />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Newsfeed;
