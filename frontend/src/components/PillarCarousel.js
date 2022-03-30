import React from "react";
import { Image, Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";

const Pillar = () => {
  return (
    <Carousel>
      <Carousel.Item>
        <Image
          className="d-block w-100"
          src="/images/coffeejournal.jpg"
          rounded
        />

        <Carousel.Caption>
          <Link to="/blog" type="button" className="btn btn-outline-light">
            Visit Our Blog
          </Link>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <Image
          className="d-block w-100"
          src="/images/coffeestreet.jpg"
          rounded
        />
        <Carousel.Caption>
          <Link to="/blog" type="button" className="btn btn-outline-light">
            Visit Our Blog
          </Link>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <Image
          className="d-block w-100"
          src="/images/coffeelaptop.jpg"
          rounded
        />
        <Carousel.Caption>
          <Link to="/blog" type="button" className="btn btn-outline-light">
            Visit Our Blog
          </Link>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};

export default Pillar;
