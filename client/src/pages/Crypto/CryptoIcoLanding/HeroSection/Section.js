import React from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardHeader,
  Button,
} from "reactstrap";
import { Link } from "react-router-dom";

//Import Countdown
import Countdown from "react-countdown";

const Section = () => {
 

  return (
    <React.Fragment>
      <section className="section hero-section bg-ico-hero" id="home">
        <div className="bg-overlay bg-primary"></div>
        <Container>
          <Row className="align-items-center">
            <Col lg={5}>
              <div className="text-white-50">
                <h1 className="text-white fw-semibold hero-title">Introducing  Marketing Headline Generator</h1>
                <p className="font-size-14">We’ve finetune a ChatGPT model with marketing headlines data, which helps your Business to Get Noticed!. </p>

                <div className="d-flex flex-wrap gap-2 mt-4">
                  <Link to="/register" className="btn btn-success">Sign up</Link>
                  <Link to="/login" className="btn btn-light">Log in</Link>
                </div>
              </div>
            </Col>
          
          </Row>
        </Container>
      </section>
    </React.Fragment>
  );
};

export default Section;
