import React from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  // CardSubtitle,
  Button,
} from "reactstrap";

const Feed = (props) => {
  console.log(Object.values(props.tweet));
  return Object.values(props.tweet).map((d, i) => {
    return (
      <div key={i} className="mb-2">
        <Card>
          <CardImg
            top
            width="100%"
            src="/assets/318x180.svg"
            alt="Card image cap"
          />
          <CardBody>
            <CardTitle tag="h5">From: {d.user_name}</CardTitle>
            {/* <CardSubtitle tag="h6" className="mb-2 text-muted">
              Card subtitle
            </CardSubtitle> */}
            <CardText>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </CardText>
            <Button className="" size="sm">
              Button
            </Button>
          </CardBody>
        </Card>
      </div>
    );
  });
};

export default Feed;
