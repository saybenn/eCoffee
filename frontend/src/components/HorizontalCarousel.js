import React from "react";
import { Button, Carousel, Image } from "react-bootstrap";
import { Link } from "react-router-dom";

const HorizontalCarousel = () => {
  return (
    <Carousel fade controls={false} indicators={false} interval={5000}>
      <Carousel.Item>
        <div className="slide">
          <div className="overlay"></div>
          <Image
            className="d-block w-100 carousel-image"
            src="/images/promoone.jpg"
            alt="creamed coffees"
          />
        </div>
        <div className="hero py-5">
          <h2>Coffee Shop Meets Blog Spot</h2>
          <h1 className="my-3">Welcome To eCo</h1>

          <Link to="/shop">
            <Button className="text-white" variant="outline-secondary">
              Shop With Us{" "}
            </Button>
          </Link>
        </div>
      </Carousel.Item>
      <Carousel.Item>
        <div className="slide">
          <div className="overlay"></div>
          <Image
            className="d-block w-100 carousel-image"
            src="/images/promotwo.jpg"
            alt="black coffee"
          />
        </div>
        <div className="hero py-5">
          <h2>Coffee Shop Meets Blog Spot</h2>
          <h1 className="my-3">Welcome To eCo</h1>
          <Link to="/shop">
            <Button className="text-white" variant="outline-secondary">
              Shop With Us{" "}
            </Button>
          </Link>
        </div>
      </Carousel.Item>
      <Carousel.Item>
        <div className="slide">
          <div className="overlay"></div>
          <Image
            className="w-100 carousel-image"
            src="/images/promothree.jpg"
            alt="coffee beans"
          />
        </div>

        <div className="hero py-5">
          <h2>Coffee Shop Meets Blog Spot</h2>
          <h1 className="my-3">Welcome To eCo</h1>
          <Link to="/shop">
            <Button className="text-white" variant="outline-secondary">
              Shop With Us{" "}
            </Button>
          </Link>
        </div>
      </Carousel.Item>
    </Carousel>
  );
};

export default HorizontalCarousel;
