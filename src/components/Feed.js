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

const Feed = ({ tweets }) => {
  // console.log(tweets);
  // console.log(Object.values(tweets));

  Object.values(tweets).forEach((ele) => {
    // console.log(ele);
    Object.values(ele).forEach((el) => {
      console.log(el);
    });
  });

  return Object.values(tweets).map((d, i) => {
    const [data] = Object.values(d);

    // console.log(data);

    // data.forEach((el) => {
    // console.log(el);
    // });

    return (
      <div key={i} className="mb-2">
        <Card>
          <CardImg
            top
            width="100%"
            src={data.tweet_image}
            alt="Card image cap"
          />
          <CardBody>
            <CardTitle tag="h5">From: {data.id}</CardTitle>
            {/* <CardSubtitle tag="h6" className="mb-2 text-muted">
              Card subtitle
            </CardSubtitle> */}
            <CardText>{data.tweet_text}</CardText>
            <Button color="link" size="sm">
              Like
            </Button>
          </CardBody>
        </Card>
      </div>
    );
  });
};

export default Feed;
