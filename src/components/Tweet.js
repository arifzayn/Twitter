import React, { useState } from "react";
import {
  Card,
  // CardImg,
  // CardText,
  CardBody,
  CardTitle,
  // CardSubtitle,
  Button,
  FormGroup,
  Label,
  Input,
  Form,
} from "reactstrap";
import { fire } from "../firebase";

const Tweet = (props) => {
  const [text, setText] = useState("");
  const [image, setImage] = useState("");
  const [datetime, setDatetime] = useState(0);
  const [likes, setLikes] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    fire.auth().onAuthStateChanged(function (user) {
      if (user) {
        // User is signed in.
        console.log(user);
        // fire
        //   .database()
        //   .ref("tweets/" + user.uid)
        //   .set({
        //     tweet_text: text,
        //     tweet_image: image,
        //     uid: user.uid,
        //     tweet_datetime: datetime,
        //     tweet_likes: likes,
        //   });

        setText("");
        setImage(null);
      } else {
        // No user is signed in.
      }
    });
  };
  return (
    <div>
      <Card>
        {/* <CardImg top width="100%" src="../logo.svg" alt="Card image cap" /> */}
        <CardBody>
          <CardTitle tag="h5">Tweet</CardTitle>
          {/* <CardSubtitle tag="h6" className="mb-2 text-muted">
            Card subtitle
          </CardSubtitle> */}
          {/* <CardText>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </CardText> */}
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Input
                type="textarea"
                name="text"
                // id="exampleText"
                value={text}
                placeholder="Write something.."
                onChange={(e) => setText(e.target.value)}
              />
              <Label for="exampleFile">Image</Label>
              <Input
                type="file"
                name="file"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </FormGroup>
            <Button>Tweet</Button>
          </Form>
        </CardBody>
      </Card>
    </div>
  );
};

export default Tweet;
