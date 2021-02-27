import { useEffect, useState } from "react";
import { Button, ButtonGroup } from "reactstrap";
import { fire } from "../firebase";

const Users = () => {
  const [user, setUser] = useState(null);
  const [usersData, setUsersData] = useState("");

  fire.auth().onAuthStateChanged(function (user) {
    if (user) {
      // User is signed in.
      setUser(user);
    } else {
      // No user is signed in.
    }
  });

  useEffect(() => {
    fire.auth().onAuthStateChanged(function (user) {
      if (user) {
        // User is signed in.

        fire
          .database()
          .ref("users")
          .once("value", (snapshot) => {
            setUsersData(snapshot.val());
          });
      } else {
        // No user is signed in.
      }
    });
  }, [usersData]);

  return (
    <div>
      <h1 className="text-center display-4">Users</h1>
      {Object.values(usersData).map((value, index) => {
        return (
          <div key={index}>
            {value.uid !== user.uid && (
              <ButtonGroup className="mb-4 btn-group-sm d-flex justify-content-center">
                <Button color="secondary" disabled>
                  {value.user_name}
                </Button>
                <Button outline color="info">
                  Follow
                </Button>
                <Button outline color="info">
                  Unfollow
                </Button>
              </ButtonGroup>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Users;
