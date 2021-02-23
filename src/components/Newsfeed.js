import { Col, Container, Input, Row } from "reactstrap";
import Tweet from "./Tweet";
import { database, fire } from "../firebase";
import { useEffect, useState } from "react";
import Feed from "./Feed";
const Newsfeed = () => {
  const [data, setData] = useState("");

  useEffect(() => {
    fire.auth().onAuthStateChanged(function (user) {
      if (user) {
        // User is signed in.

        database.ref("tweets").once("value", (snapshot) => {
          setData(snapshot.val());
          // snapshot.forEach((childSnapshot) => {
          //   // var childKey = childSnapshot.key ;
          //   // var childData = childSnapshot.val();
          //   // ...
          // });
        });
      } else {
        // No user is signed in.
      }
    });
  }, []);

  return (
    <Container>
      <Input
        type="text"
        name="text"
        id="exampleText"
        placeholder="Search Users.."
        className="w-25 mt-4"
      />
      <h1 className="text-center display-1">Newsfeed</h1>
      <Row>
        <Col xs="6" sm="3" className="border border-danger">
          <Tweet />
        </Col>
        <Col xs="auto" sm="6" className="border border-danger">
          {/* .col-6 .col-sm-4 */}
          <Feed tweets={data} />
        </Col>
        <Col sm="3" className="border border-danger">
          <h1>Users</h1>
          {Object.values(data).map((d, i) => {
            return (
              <ul key={i}>
                <li>{d.user_name}</li>
              </ul>
            );
          })}
        </Col>
      </Row>
    </Container>
  );
};

export default Newsfeed;
