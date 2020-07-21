import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faNewspaper, faAddressBook, faProjectDiagram } from "@fortawesome/free-solid-svg-icons";
import FaceLogo from "../../assets/face.png";
import People from "../../assets/people.jpg";
import "./WelcomePage.scss";

export default function WelcomePage() {

    return(
        <Container className="welcome-page" fluid>
            <Row>
                <PanelIzquierdo />
                <PanelDerecho />
            </Row>
        </Container>
    );
}

function PanelIzquierdo(){
    return(
        <Col className="welcome-page_left" xs={6}>
            <img src={People} alt="People"/>
            <div>
                <h4>
                    <FontAwesomeIcon icon={faNewspaper} />
                    &nbsp; See updates from friends in News Feed.
                </h4>
                <br/>
                <h4>
                    <FontAwesomeIcon icon={faAddressBook} />
                    &nbsp; Share what's new in your life on your Timeline.
                </h4>
                <br/>
                <h4>
                    <FontAwesomeIcon icon={faProjectDiagram} />
                    &nbsp; Make new friends in this Network.
                </h4>
            </div>
        </Col>
    );
}

function PanelDerecho(){
    return(
        <Col className="welcome-page_right" xs={6}>
            <img src={FaceLogo} alt="FaceLogo" height={150}/>
            <div>
                <h3>Sign Up to R2R Social</h3>
                <h4>It's quick and easy</h4>
                <Button variant="warning">Sign Up</Button>
                <Button variant="outline-warning">Log In</Button>
            </div>
        </Col>
    );
}