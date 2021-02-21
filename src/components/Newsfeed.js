import { Col, Container, Input, Row } from "reactstrap";
import Tweet from "./Tweet";
import { database, fire } from "../firebase";
import { useEffect, useState } from "react";
import Feed from "./Feed";
const Newsfeed = () => {
  // const [users, setUsers] = useState(null);

  const [data, setData] = useState("");

  // const [u_name, setUserName] = useState("");
  // const [e_mail, setEmail] = useState("");

  /*const users = () => {
    fire.auth().onAuthStateChanged(function (user) {
      if (user) {
        // User is signed in.
        // setUsers(user);

        // console.log(data);

        database
          .ref("users")
          // .orderByChild("user_name")
          .once("value", (snapshot) => {
            snapshot.forEach((childSnapshot) => {
              // var childKey = childSnapshot.key ;
              // var childData = childSnapshot.val();
              // ...
              // var { user_name, email } = childSnapshot.val();
              // var { email } = childSnapshot.val();
              // console.log(user_name, email);
              // console.log(email);
              // const cdata = Object.values(childData);
              // console.log(cdata);
              // const numbers = [1, 2, 3, 4, 5];
              // const listItems = Object.values(childData).map((data) => (
              // <li key={data.key}>{data.user_name}</li>
              // ));
            });
          });

        // fire.database().ref.once("value", (snapshot) => {
        //   snapshot.forEach((childSnapshot) => {
        //     var childKey = childSnapshot.key;
        //     var childData = childSnapshot.val();
        //     // ...

        //     console.log(childData);
        //   });
        // });
      } else {
        // No user is signed in.
      }
    });
  };*/

  useEffect(() => {
    fire.auth().onAuthStateChanged(function (user) {
      if (user) {
        // User is signed in.
        // setUsers(user);

        // console.log(data);

        database
          .ref("users")
          // .orderByChild("user_name")
          .once("value", (snapshot) => {
            setData(snapshot.val());
            snapshot.forEach((childSnapshot) => {
              // var childKey = childSnapshot.key ;
              // var childData = childSnapshot.val();
              // ...
              // var { user_name, email } = childSnapshot.val();
              // var { email } = childSnapshot.val();
              // console.log(user_name, email);
              // console.log(email);
              // const cdata = Object.values(childData);
              // console.log(cdata);
              // const numbers = [1, 2, 3, 4, 5];
              // const listItems = Object.values(childData).map((data) => (
              // <li key={data.key}>{data.user_name}</li>
              // ));
            });
          });

        // fire.database().ref.once("value", (snapshot) => {
        //   snapshot.forEach((childSnapshot) => {
        //     var childKey = childSnapshot.key;
        //     var childData = childSnapshot.val();
        //     // ...

        //     console.log(childData);
        //   });
        // });
      } else {
        // No user is signed in.
      }
    });
  }, []);

  // const da = () => {
  //   console.log(Object.values(data)[0].user_name);
  // };

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
          <Feed tweet={data} />
        </Col>
        <Col sm="3" className="border border-danger">
          {/* .col-sm-4 */}
          {/* {users()} */}
          {/* {da()} */}
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
