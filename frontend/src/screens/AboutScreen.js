import React from "react";
import { Col, Image, Row } from "react-bootstrap";
import Container from "../components/Container";

const AboutScreen = () => {
  return (
    <>
      <Container>
        <Row className="justify-content-center">
          <Image className="w-50 my-3" fluid src="/images/promoone.jpg" />
        </Row>
        <Row className="justify-content-center ">
          <h2 className="my-3 text-center">About Us</h2>
        </Row>
        <Row>
          <p className="line-height">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus
            velit cum ea ut repudiandae quaerat, dicta autem a vel cumque.
            Cupiditate magnam voluptate perspiciatis officiis ipsam doloribus
            nesciunt temporibus nam tempora impedit ipsum consectetur excepturi
            perferendis esse illo quidem assumenda, mollitia laboriosam alias ad
            non cumque provident? Voluptatibus necessitatibus earum maiores
            aliquid quae id aspernatur odio quod esse dolore sit culpa, quam
            totam eos nesciunt velit sapiente dicta laborum laboriosam possimus.
            Eligendi maxime dolorum recusandae! Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Molestias, unde doloremque temporibus
            quae accusamus earum sequi eos! Eos tempora odio voluptate cum
            laborum veritatis!
          </p>
        </Row>
        <Row>
          <h3 className="my-3 text-center">Our Mission</h3>
        </Row>
        <Row>
          <Col md={8}>
            <p className="line-height">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam
              corporis mollitia cum! Rerum quam, pariatur inventore voluptatem
              nostrum id quod harum neque, aperiam officia repellendus
              perferendis dolores possimus culpa consectetur ipsa praesentium
              commodi quo ea, esse eveniet. Nisi voluptas, optio itaque quod
              natus facere reiciendis inventore illum aliquam ullam! Lorem ipsum
              dolor sit amet consectetur adipisicing elit. Numquam doloribus,
              sapiente nemo aliquid corporis expedita. Lorem ipsum dolor sit
              amet consectetur, adipisicing elit. Consequuntur deleniti id natus
              consequatur voluptate, aliquid quisquam similique quis? Sunt totam
              ipsa minima, perspiciatis et qui sit expedita iusto iste
              doloremque? Repellendus, velit! Enim dicta dignissimos,
              reprehenderit magni perferendis autem et ut! Minus, incidunt
              facere dolorum eos voluptatum ad vel adipisci.
            </p>
          </Col>
          <Col className="d-flex justify-content-center" md={4}>
            {" "}
            <Image
              src="/images/promothree.jpg"
              roundedCircle
              className="text-right inline-img"
            />
          </Col>

          <p className="mt-3 line-height">
            Ad aspernatur velit accusamus quis commodi! Iusto, recusandae
            explicabo doloribus ad placeat magnam autem id facere aut
            accusantium delectus repudiandae quaerat quod culpa magni nisi quia
            numquam nemo error atque sunt fugiat ab iste. Iusto veritatis iste
            autem suscipit quisquam! Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Omnis, maiores. Non ad atque tempore vitae velit,
            placeat impedit excepturi necessitatibus adipisci maxime commodi.
            Repudiandae, magnam. Ex, iure. Quia, omnis ratione. Lorem ipsum
            dolor sit amet consectetur adipisicing elit. Eaque suscipit
            provident optio eos at officiis sequi veritatis, unde ab nesciunt
            qui, earum error, atque laudantium. Atque quae neque hic similique
            quos fugiat. Sequi pariatur rem delectus libero laborum officia
            beatae! Veritatis quos modi delectus nam?
          </p>
        </Row>
        <Row>
          <h4 className="my-3 text-center">Save the Environment</h4>
        </Row>
      </Container>
    </>
  );
};

export default AboutScreen;
