import React from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  Button,
} from "reactstrap";

const Feed = ({ tweets }) => {
  return Object.values(tweets).map((d, i) => {
    const data = Object.values(d);
    return Object.values(data).map((element, index) => {
      return (
        <div key={index} className="d-flex justify-content-center">
          <Card className="mb-2">
            <CardImg
              top
              width="100%"
              src={element.tweet_image}
              alt="Card image cap"
            />
            <CardBody>
              <CardTitle tag="h5">From: {element.id}</CardTitle>
              <CardText>{element.tweet_text}</CardText>
              <Button color="link" size="sm" outline>
                Like
              </Button>
            </CardBody>
          </Card>
        </div>
      );
    });
  });
};

export default Feed;
