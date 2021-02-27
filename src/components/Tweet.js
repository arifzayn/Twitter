import React, { useState } from "react";
import {
  Card,
  CardBody,
  CardTitle,
  Button,
  FormGroup,
  Input,
  Form,
  FormText,
} from "reactstrap";
import { fire } from "../firebase";

const Tweet = () => {
  const [text, setText] = useState("");
  const [image, setImage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    fire.auth().onAuthStateChanged(function (user) {
      if (user) {
        // User is signed in.
        console.log(user);

        var storage = fire.storage();

        var storageRef = storage.ref();

        var imagesRef = storageRef.child(image.name);

        imagesRef.put(image).then((snapshot) => {
          console.log("Uploaded a blob or file!");

          snapshot.ref.getDownloadURL().then((downloadURL) => {
            console.log("File available at", downloadURL);

            fire
              .database()
              .ref("tweets/" + user.uid)
              .push({
                tweet_text: text,
                tweet_image: downloadURL,
                id: user.email,
              });
          });
        });

        setText("");
      } else {
        // No user is signed in.
      }
    });
  };
  return (
    <div>
      <Card>
        <CardBody>
          <CardTitle tag="h5">Tweet</CardTitle>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Input
                type="textarea"
                name="text"
                value={text}
                placeholder="Write something.."
                required
                onChange={(e) => setText(e.target.value)}
              />
              <Input
                className="mt-1"
                type="file"
                name="file"
                required
                bsSize="sm"
                onChange={(e) => setImage(e.target.files[0])}
              />
              <FormText color="muted">Choose a profile picture</FormText>
            </FormGroup>
            <Button color="info" block>
              Tweet
            </Button>
          </Form>
        </CardBody>
      </Card>
    </div>
  );
};

export default Tweet;
